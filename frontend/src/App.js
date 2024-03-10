import { Container } from "react-bootstrap/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import React from "react";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import OrderEditScreen from "./screens/admin/OrderEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="pt-2">
        <Container>
          <Routes>
            <Route path="/" Component={HomeScreen} exact />
            <Route path="/login" Component={LoginScreen} />
            <Route path="/register" Component={RegisterScreen} />
            <Route path="/shipping" Component={ShippingScreen} />
            <Route path="/payment" Component={PaymentScreen} />
            <Route path="/placeorder" Component={PlaceOrderScreen} />
            <Route path="/order/:id" Component={OrderDetailsScreen} />
            <Route path="/profile" Component={ProfileScreen} />
            <Route path="/products/:id" Component={ProductScreen} />
            <Route path="/cart/:id?" Component={CartScreen} />

            <Route path="/admin/user/list" Component={UserListScreen} />
            <Route path="/admin/user/:id" Component={UserEditScreen} />
            <Route path="/admin/product/list" Component={ProductListScreen} />
            <Route path="/admin/product/:id" Component={ProductEditScreen} />
            <Route path="/admin/order/list" Component={OrderListScreen} />
            <Route path="/admin/order/:id" Component={OrderEditScreen} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
