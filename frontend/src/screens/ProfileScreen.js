import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import moment from "moment";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname.substring(1)}`);
    } else {
      if (!user || !user.firstName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success, location]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <Row>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Col md={3}>
        <h2 className="text-center">User Profile</h2>
        <Form onSubmit={submitHandler} className="border rounded px-3 py-1">
          <Form.Group controlId="firstName" className="my-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="lastName" className="my-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button type="submit" className="my-1 w-50 btn btn-info">
              Update
            </Button>
          </div>
        </Form>
      </Col>
      <Col md={9}>
        <h2 className="text-center">My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <div className="border rounded">
            <Table striped responsive className="table-sm text-center mb-0">
              <thead>
                <tr style={{ lineHeight: "2.5rem" }}>
                  <th>ID</th>
                  <th>Date Time</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ lineHeight: "2.5rem" }}>
                    <td>{order.id}</td>
                    <td>
                      {moment(order.createdAt).format("YYYY/MM/DD HH:mm")}
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        moment(order.paidAt).format("YYYY/MM/DD HH:mm")
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>

                    <td>
                      <LinkContainer to={`/order/${order.id}`}>
                        <Button className="btn-sm" variant="info">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
