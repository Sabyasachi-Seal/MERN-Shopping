import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import { CREATE_PRODUCT_RESET } from "../types/productTypes";
import Paginate from "../components/Paginate";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const productList = useSelector((state) => state.products);
  const { error, loading, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deletedProducts = useSelector((state) => state.deleteProductReducer);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deletedProducts;
  const createdProduct = useSelector((state) => state.createProduct);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: productCreated,
  } = createdProduct;

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET });
    if (!userInfo.isAdmin) {
      history("/signIn");
    }
    if (successCreate) {
      history(`/admin/product/${productCreated._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    successCreate,
    productCreated,
    pageNumber,
  ]);

  const onDeleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const onCreateProduct = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="heading">
        <Col className="align-items-center">
          <h1>Products</h1>
        </Col>
        <Col className="text-right create-btn">
          <Button className="my-3" onClick={onCreateProduct}>
            <i class="fa-duotone fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>BRAND</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr className="m-1">
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td className="m-2">
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button>
                          <i class="fa-solid fa-pen-to-square"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        onClick={() => onDeleteHandler(product._id)}
                        style={{ color: "grey" }}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
