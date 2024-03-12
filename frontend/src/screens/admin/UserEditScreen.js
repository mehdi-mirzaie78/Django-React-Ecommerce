import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { Message } from "../../components/Message";
import { FormContainer } from "../../components/FormContainer";
import {
  getUserAdminDetails,
  updateUserAdmin,
} from "../../actions/userActions";
import { USER_ADMIN_UPDATE_RESET } from "../../constants/userConstants";

const UserEditScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userAdminDetails = useSelector((state) => state.userAdminDetails);
  const { error, loading, user } = userAdminDetails;

  const userAdminUpdate = useSelector((state) => state.userAdminUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userAdminUpdate;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname}`);
    } else if (!userInfo.isAdmin) {
      navigate("/");
    } else if (successUpdate) {
      dispatch({ type: USER_ADMIN_UPDATE_RESET });
      navigate("/admin/user/list");
    } else if (!user || user.id !== Number(id)) {
      dispatch(getUserAdminDetails(id));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsActive(user.isActive);
    }
  }, [dispatch, userInfo, user, id, successUpdate, navigate, location]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserAdmin({
        id: user.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        isAdmin: isAdmin,
        isActive: isActive,
      })
    );
  };
  return (
    <div>
      <Link to="/admin/user/list" className="btn btn-light mt-1">
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <Message
          variant="danger"
          dismissible
          onClose={(a, b) => dispatch({ type: USER_ADMIN_UPDATE_RESET })}
        >
          {errorUpdate}
        </Message>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" dismissible>
          {error}
        </Message>
      ) : (
        <FormContainer>
          <h1>Edit User</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="firstName" className="my-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lastName" className="my-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Label>Admin Status</Form.Label>
              <Form.Check
                type="checkbox"
                placeholder="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="isActive" className="my-2">
              <Form.Label>Activation Status</Form.Label>
              <Form.Check
                type="checkbox"
                placeholder="Is Active?"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <div className="text-center">
              <Button type="submit" variant="primary" className="my-1">
                Edit
              </Button>
            </div>
          </Form>
        </FormContainer>
      )}
    </div>
  );
};

export default UserEditScreen;
