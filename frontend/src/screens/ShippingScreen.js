import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [country, setCountry] = useState(shippingAddress.country);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [address, setAddress] = useState(shippingAddress.address);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ country, city, postalCode, address }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter city"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter postal code"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
