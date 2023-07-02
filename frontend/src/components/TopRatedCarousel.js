import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listTopratedProduct } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const TopRatedCarousel = () => {
  const dispatch = useDispatch();
  const topRatedProducts = useSelector((state) => state.topRatedProduct);
  const { loading, error, products } = topRatedProducts;

  useEffect(() => {
    dispatch(listTopratedProduct());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} fluid alt={product.name} />
            <Carousel.Caption className="caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopRatedCarousel;
