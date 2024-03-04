import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../components/Message";
import { Loader } from "../components/Loader";
import { Hr } from "../components/Hr";
import { getOrderDetails } from "../actions/orderActions";
import moment from "moment";
const OrderDetailsScreen = () => {
  const orderId = useParams().id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!order || order.id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: #{order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup style={{ backgroundImage: "none" }} className="p-1 px-2">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {"  "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <Hr />
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Payment: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {moment(order.paidAt).format("YYYY/MM/DD HH:mm:ss")}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <Hr />

            <ListGroup.Item>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your order is empty</Message>
              ) : (
                <ListGroup
                  style={{ backgroundImage: "none", boxShadow: "none" }}
                >
                  <h2>Order Items</h2>
                  {order.orderItems.map((item, index) => (
                    <>
                      <ListGroup.Item
                        key={index}
                        style={{ backgroundImage: "" }}
                      >
                        <Row className="align-items-center">
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col md={6}>
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4} className="text-center">
                            {item.quantity} X ${item.price} = $
                            {(item.quantity * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <Hr />
                    </>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card style={{ backgroundImage: "none", boxShadow: "none" }}>
            <ListGroup
              variant="flush"
              style={{ backgroundImage: "none" }}
              className="p-1"
            >
              <ListGroup.Item>
                <div className="text-center">
                  <h2>Order Summary</h2>
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <Hr />
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <Hr />
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <Hr />
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailsScreen;
