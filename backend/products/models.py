import datetime
from django.db import models
from accounts.models import User


class Product(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="products"
    )
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(default="default.jpg", null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        default=0, max_digits=7, decimal_places=2, null=True, blank=True
    )
    count_in_stock = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def update_product_rating_based_on_reviews(self):
        queryset = Review.objects.filter(product=self)
        if queryset.count() > 0:
            self.num_reviews = queryset.count()
            rating_list = [review.rating for review in queryset]
            self.rating = sum(rating_list) / len(rating_list)
            self.save()


class Review(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, related_name="reviews", null=True
    )
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="reviews", null=True
    )
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.rating)

    class Meta:
        unique_together = ["product", "user"]
