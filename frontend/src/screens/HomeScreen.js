import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Paginator from "../components/Paginator";
import { listProducts } from "../actions/productActions";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { useLocation } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  let search = location.search;

  useEffect(() => {
    dispatch(listProducts(search));
  }, [dispatch, search]);

  return (
    <div>
      {!search && <ProductCarousel />}
      <h1 className="mb-0">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <hr></hr>

          <Paginator page={page} pages={pages} search={search} />
        </>
      )}
    </div>
  );
}

export default HomeScreen;
