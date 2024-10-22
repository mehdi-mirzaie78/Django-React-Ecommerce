import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { Message } from "../../components/Message";
import { getUserList, deleteUser } from "../../actions/userActions";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: userDeleteLoading,
    success: userDeleteSuccess,
    error: userDeleteError,
  } = userDelete;

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname}`);
    } else if (!userInfo.isAdmin) {
      navigate("/");
    }
    dispatch(getUserList());
  }, [dispatch, navigate, location, userInfo, userDeleteSuccess]);

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };
  return (
    <>
      {userDeleteLoading ? (
        <Loader />
      ) : (
        userDeleteError && <Message variant="danger">{userDeleteError}</Message>
      )}
      <h1>Users</h1>
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIVATION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
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
                  {user.isActive ? (
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
                  <LinkContainer to={`/admin/user/${user.id}`} className="mx-1">
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" /> EDIT
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm mx-1"
                    onClick={() => deleteHandler(user.id)}
                  >
                    <i className="fas fa-trash" /> DELETE
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
