import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { Message } from "../../components/Message";
import { FormContainer } from "../../components/FormContainer";
import {
  getProductAdminDetails,
  updateProductAdmin,
} from "../../actions/productActions";
import { PRODUCT_ADMIN_UPDATE_RESET } from "../../constants/productConstants";

const ProductEditScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productAdminDetails = useSelector((state) => state.productAdminDetails);
  const { error, loading, product } = productAdminDetails;

  const productAdminUpdate = useSelector((state) => state.productAdminUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productAdminUpdate;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname}`);
    } else if (!userInfo.isAdmin) {
      navigate("/");
    } else if (successUpdate) {
      dispatch({ type: PRODUCT_ADMIN_UPDATE_RESET });
      // navigate("/admin/product/list");
    } else if (!product || product.id !== Number(id)) {
      dispatch(getProductAdminDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, userInfo, product, id, navigate, location, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAdmin({
        id: product.id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <>
      <Link to="/admin/product/list" className="btn btn-light mt-1 mb-2">
        Go Back
      </Link>

      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

      {loading || loadingUpdate ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1 className="text-center mb-0">Edit Product</h1>
          <Form onSubmit={submitHandler}>
            <Row className="align-items-center">
              <Col sm={12} md={8} lg={6}>
                <Form.Group controlId="image" className="my-1">
                  <Form.Label>Image</Form.Label>

                  <Form.Control
                    type="file"
                    placeholder="Enter image"
                    onChange={(e) => setImage(e.target.files[0])}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="name" className="my-1">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="brand" className="my-1">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={12} md={4} lg={6}>
                <div className="my-1 text-center">
                  <Form.Label>Preview</Form.Label>
                  <Image
                    className="d-flex mx-auto rounded h-100 w-100"
                    src={product.image}
                  />

                  <p className="text-light mt-1 text-truncate">
                    {product.image}
                  </p>
                </div>
              </Col>

              <Col sm={12} md={6} lg={3}>
                <Form.Group controlId="price" className="my-1">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    step={0.01}
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={12} md={6} lg={3}>
                <Form.Group controlId="countInStock" className="my-1">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <Form.Group controlId="category" className="my-1">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Form.Group controlId="description" className="my-1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>

            <div className="text-center">
              <Button type="submit" variant="primary" className="my-2">
                Edit
              </Button>
            </div>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductEditScreen;
