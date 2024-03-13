import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { Message } from "../../components/Message";
import {
  getProductAdminList,
  deleteProductAdmin,
  createProductAdmin,
} from "../../actions/productActions";
import { PRODUCT_ADMIN_CREATE_RESET } from "../../constants/productConstants";
import Paginator from "../../components/Paginator";
import SearchBar from "../../components/SearchBar";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let search = location.search;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productAdminList = useSelector((state) => state.productAdminList);
  const { loading, error, products, page, pages } = productAdminList;

  const productAdminDelete = useSelector((state) => state.productAdminDelete);
  const {
    loading: loadingProductDelete,
    error: errorProductDelete,
    success: successDelete,
  } = productAdminDelete;

  const productAdminCreate = useSelector((state) => state.productAdminCreate);
  const {
    loading: loadingProductCreate,
    error: errorProductCreate,
    success: successCreate,
    product: createdProduct,
  } = productAdminCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_ADMIN_CREATE_RESET });

    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname}`);
    } else if (!userInfo.isAdmin) {
      navigate("/");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct.id}`);
    } else {
      dispatch(getProductAdminList(search));
    }
  }, [
    dispatch,
    navigate,
    location,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    search,
  ]);

  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAdmin(productId));
    }
  };
  const createProductHandler = () => {
    dispatch(createProductAdmin());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col md={2}>
          <h1>Products</h1>
        </Col>
        <Col md={8}>
          <SearchBar pathname="/admin/product/list/" />
        </Col>
        <Col md={2} className="text-end">
          <Button className="my-3 btn-secondary" onClick={createProductHandler}>
            <i className="fas fa-plus" /> Create Product
          </Button>
        </Col>
      </Row>

      {errorProductDelete && (
        <Message variant="danger">{errorProductDelete}</Message>
      )}
      {errorProductCreate && (
        <Message variant="danger">{errorProductCreate}</Message>
      )}

      {loading || loadingProductDelete || loadingProductCreate ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
                <th>STOCK</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>IMAGE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>$ {product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="py-1">
                    <Image
                      height={50}
                      className="rounded"
                      src={product.image}
                    />
                  </td>

                  <td>
                    <LinkContainer
                      to={`/admin/product/${product.id}`}
                      className="mx-1"
                    >
                      <Button variant="info" className="btn-sm">
                        <i className="fas fa-edit" /> EDIT
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm mx-1"
                      onClick={() => deleteHandler(product.id)}
                    >
                      <i className="fas fa-trash" /> DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginator page={page} pages={pages} search={search} isAdmin />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
