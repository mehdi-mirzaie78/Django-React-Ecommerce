import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { Hr } from "../components/Hr";
import { detailsProduct, createProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function ProductScreen() {
  const { id } = useParams();
  let navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  // These states are for creating new review
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      setName("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(detailsProduct(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { name, rating, comment }));
  };
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid rounded />
            </Col>
            <Col md={4}>
              <ListGroup
                style={{
                  backgroundImage: "none",
                }}
                className="h-100"
              >
                <ListGroup.Item className="pb-0">
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <Hr />
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={
                      product.numReviews === 1
                        ? `${product.numReviews} review`
                        : `${product.numReviews} reviews`
                    }
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <Hr />
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <Hr />
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card style={{ backgroundImage: "none" }}>
                <ListGroup
                  variant="flush"
                  style={{ backgroundImage: "none", boxShadow: "none" }}
                  className="rounded"
                >
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <Hr />
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <Hr />
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="mt-1">Quantity</Col>
                        <Col xs="auto" className="mt-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="form-select form-select-sm"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option className="" key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <Hr />
                  <ListGroup.Item className="text-center">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block w-100"
                      disabled={product.countInStock === 0}
                      type="button"
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={5}>
              <h4 className="text-center">Reviews</h4>
              {product.reviews.length === 0 && (
                <Message variant="info">No reviews</Message>
              )}
              <ListGroup
                style={{
                  backgroundImage: "none",
                  overflow: "auto",
                  maxHeight: "320px",
                }}
              >
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review.id} className="pt-1 my-1">
                    <div style={{ borderBottom: "1px solid" }}>
                      <Row className="align-items-center my-1">
                        <Col>
                          <strong>{review.name}</strong>
                        </Col>
                        <Col className="text-end">
                          <p className="mb-0">
                            {moment(review.createdAt).format(
                              "YYYY/MM/DD HH:mm"
                            )}
                          </p>
                        </Col>
                      </Row>
                      <Rating value={review.rating} color="#f8e825" />

                      <p>{review.comment}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={7}>
              <h4 className="text-center">Write a review</h4>
              {loadingProductReview && <Loader />}
              {successProductReview && (
                <Message variant="success">Review Submitted</Message>
              )}

              {errorProductReview && (
                <Message
                  variant="danger"
                  dismissible
                  onClose={(a, b) =>
                    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
                  }
                >
                  {errorProductReview}
                </Message>
              )}

              {userInfo ? (
                <ListGroup style={{ backgroundImage: "none" }}>
                  <ListGroup.Item>
                    <Form onSubmit={submitHandler}>
                      <Row>
                        <Col md={6} className="mb-2">
                          <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              placeholder="Enter your name or leave it"
                              type="text"
                              onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-2">
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option key="select-option" value="">
                                Select...
                              </option>
                              {[
                                [1, "Poor"],
                                [2, "Fair"],
                                [3, "Good"],
                                [4, "Very Good"],
                                [5, "Excellent"],
                              ].map((opt) => (
                                <option
                                  key={opt[0]}
                                  value={opt[0]}
                                >{`${opt[0]} - ${opt[1]}`}</option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>

                        <Col md={12} className="mb-2">
                          <Form.Group controlId="comment">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                              as="textarea"
                              placeholder="Write your review for this product"
                              type="text"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        type="submit"
                        variant="info"
                        className="d-flex mx-auto my-1"
                        disabled={loadingProductReview}
                      >
                        Submit
                      </Button>
                    </Form>
                  </ListGroup.Item>
                </ListGroup>
              ) : (
                <Message variant="info">
                  Please{" "}
                  <Link to={`/login?redirect=${location.pathname}`}>Login</Link>
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ProductScreen;
