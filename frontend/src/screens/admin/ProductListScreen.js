import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { Message } from "../../components/Message";
import { listProducts } from "../../actions/productActions";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname.substring(1)}`);
    } else if (!userInfo.isAdmin) {
      navigate("/");
    }
    dispatch(listProducts());
  }, [dispatch, navigate, location, userInfo]);

  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      //   dispatch(deleteProduct(productId));
    }
  };
  const createProductHandler = (product) => {
    console.log("Create");
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3 btn-secondary" onClick={createProductHandler}>
            <i className="fas fa-plus" /> Create Product
          </Button>
        </Col>
      </Row>
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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer
                    to={`/admin/product/${product.id}`}
                    className="mx-1"
                  >
                    <Button variant="info" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm mx-1"
                    onClick={() => deleteHandler(product.id)}
                  >
                    <i className="fas fa-trash" />
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

export default ProductListScreen;
