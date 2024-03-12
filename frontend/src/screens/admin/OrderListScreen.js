import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { Message } from "../../components/Message";
import { getOrderAdminList } from "../../actions/orderActions";
import moment from "moment";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderAdminList = useSelector((state) => state.orderAdminList);
  const { loading, error, orders } = orderAdminList;

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname}`);
    } else if (!userInfo.isAdmin) {
      navigate("/");
    }
    dispatch(getOrderAdminList());
  }, [dispatch, navigate, location, userInfo]);

  return (
    <>
      <h1 className="text-center">Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm text-center"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>DATE & TIME</th>
              <th>Total</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user.email}</td>
                <td>{moment(order.createdAt).format("YYYY/MM/DD HH:mm")}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <i
                      className="fas fa-check"
                      style={{ color: "rgb(144,238,144)", fontSize: "1.4rem" }}
                    />
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", fontSize: "1.4rem" }}
                    />
                  )}
                </td>
                <td>
                  {order.isPaid &&
                    moment(order.paidAt).format("YYYY/MM/DD HH:mm")}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i
                      className="fas fa-check"
                      style={{ color: "rgb(144,238,144)", fontSize: "1.4rem" }}
                    />
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red", fontSize: "1.4rem" }}
                    />
                  )}
                </td>
                <td>
                  {order.isDelivered &&
                    moment(order.deliveredAt).format("YYYY/MM/DD HH:mm")}
                </td>
                <td>
                  <LinkContainer
                    to={`/admin/order/${order.id}`}
                    className="mx-1 my-1"
                  >
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" /> DETAILS
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
