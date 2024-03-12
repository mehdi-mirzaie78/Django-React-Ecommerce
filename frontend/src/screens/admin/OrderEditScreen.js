import React, { Fragment, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { Hr } from "../../components/Hr";
import {
  getOrderAdminDetails,
  updateOrderAdmin,
} from "../../actions/orderActions";
import { ORDER_ADMIN_UPDATE_RESET } from "../../constants/orderConstants";
import moment from "moment";

const OrderEditScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = useParams().id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderAdminDetails = useSelector((state) => state.orderAdminDetails);
  const { order, loading, error } = orderAdminDetails;

  const orderAdminUpdate = useSelector((state) => state.orderAdminUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = orderAdminUpdate;

  if (!loading && !error && order) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname}`);
    } else if (!userInfo.isAdmin) {
      navigate("/");
    } else if (!order || order.id !== Number(orderId) || successUpdate) {
      dispatch({ type: ORDER_ADMIN_UPDATE_RESET });
      dispatch(getOrderAdminDetails(orderId));
    }
  }, [dispatch, navigate, location, order, orderId, userInfo, successUpdate]);

  const paymentHandler = () => {
    let data = { id: order.id, isPaid: true };
    dispatch(updateOrderAdmin(data));
  };

  const deliverHandler = () => {
    let data = { id: order.id, isDelivered: true };
    dispatch(updateOrderAdmin(data));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : errorUpdate ? (
    <Message variant="danger">{errorUpdate}</Message>
  ) : (
    <>
      <Link to="/admin/order/list" className="btn btn-light mt-1 mb-2">
        Go Back
      </Link>

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
                  Delivered{" "}
                  {moment(order.deliveredAt).format("YYYY/MM/DD HH:mm:ss")}
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
                    <Fragment key={index}>
                      <ListGroup.Item style={{ backgroundImage: "" }}>
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
                    </Fragment>
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
              {!order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="w-100"
                    onClick={paymentHandler}
                  >
                    Mark As Paid
                  </Button>
                </ListGroup.Item>
              )}
              {order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="w-100"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
            {loadingUpdate && <Loader />}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderEditScreen;
