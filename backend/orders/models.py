from typing import List, Dict
from django.db import models
from accounts.models import User
from products.models import Product


class Order(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="orders", null=True
    )
    payment_method = models.CharField(max_length=200, null=True, blank=True)
    tax_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.created_at)

    @classmethod
    def create_order_from_data(cls, user: User, data: dict) -> "Order":
        order = Order.objects.create(
            user=user,
            payment_method=data["payment_method"],
            tax_price=data["tax_price"],
            shipping_price=data["shipping_price"],
            total_price=data["total_price"],
        )
        return order

    def create_order_items_and_update_stock(self, items: List[Dict]):
        product_pks = [item["product"] for item in items]
        product_list = list(Product.objects.filter(pk__in=product_pks))
        order_item_list = [
            OrderItem(
                product=product,
                order=self,
                name=product.name,
                quantity=item["qty"],
                price=item["price"],
                image=product.image.url,
            )
            for item, product in zip(items, product_list)
        ]

        OrderItem.objects.bulk_create(order_item_list)

        for item, product in zip(order_item_list, product_list):
            product.count_in_stock -= item.quantity
            product.save()


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, related_name="items", null=True
    )
    name = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name="shipping_address",
        null=True,
        blank=True,
    )
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postal_code = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return self.address

    @classmethod
    def create_shipping_address_from_data(
        cls, order: Order, data: dict
    ) -> "ShippingAddress":
        shipping_address = ShippingAddress.objects.create(
            order=order,
            address=data["address"],
            city=data["city"],
            postal_code=data["postal_code"],
            country=data["country"],
        )
        return shipping_address
