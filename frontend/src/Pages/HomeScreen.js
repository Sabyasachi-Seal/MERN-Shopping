import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Products from "../components/Products";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import TopRatedCarousel from "../components/TopRatedCarousel";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products);
  const { error, loading, products, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {/* {!keyword && <TopRatedCarousel />} */}
      <h1 className="mt-3">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products && products.length === 0 && keyword ? (
            <Message>
              Oops no products found! <Link to="/">Go to HomePage</Link>
            </Message>
          ) : (
            <Row>
              {products &&
                products.map((item) => {
                  return (
                    <Col sm={12} md={4} lg={4} xl={3}>
                      <Products product={item} />
                    </Col>
                  );
                })}
            </Row>
          )}
          <Paginate
            keyword={keyword ? keyword : ""}
            page={pageNumber}
            pages={pages}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
