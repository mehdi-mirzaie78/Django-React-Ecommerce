import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components/FormContainer";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname}`);
    } else if (cartItems.length === 0) {
      navigate(`/cart`);
    } else if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [userInfo, navigate, location, cartItems, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <Form onSubmit={submitHandler} className="pb-3">
          <Form.Group>
            <Form.Label as="legend" className="text-center mt-2 mb-3">
              Select a Method
            </Form.Label>
            <Row className="align-items-center">
              <Col sm={12} md={6} className="my-1">
                <Form.Check
                  type="radio"
                  label="Paypal or Credit Card"
                  id="paypal"
                  name="paymentMethod"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
              <Col sm={12} md={6} className="text-end my-1">
                <Button type="submit" variant="primary">
                  Continue
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
