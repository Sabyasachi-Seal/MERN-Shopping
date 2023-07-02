import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createProductReview, listProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { CREATE_PRODUCT_REVIEW_RESET } from "../types/productTypes";

const ProductScreen = () => {
  const [qty, setqty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const history = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createProductReviewed = useSelector(
    (state) => state.createProductReview
  );
  const { success: successProductReview, error: errorProductReview } =
    createProductReviewed;

  useEffect(() => {
    if (successProductReview) {
      alert("review submitted");
      setRating(0);
      setComment("");
      dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
    }
    dispatch(listProduct(id));
  }, [id, dispatch, successProductReview]);

  const addToCart = () => {
    history(`/cart/${id}?qty=${qty}`);
  };

  const onReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go to Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price : ${product.price}</ListGroupItem>
                <ListGroupItem>
                  Description : {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price :</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        {product.countInStock > 0 ? "InStock" : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity :</Col>
                        <Col>
                          <Form.Select
                            value={qty}
                            onChange={(e) => setqty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option value={x + 1} key={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className="btn-block w-100 mb-3"
                      disabled={product.countInStock > 0 ? false : true}
                      onClick={addToCart}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((item) => {
                  return (
                    <ListGroupItem key={item._id}>
                      <strong>{item.name}</strong>
                      <Rating value={item.rating}></Rating>
                      <p>{item.createdAt.substring(0, 10)}</p>
                      <p>{item.comment}</p>
                    </ListGroupItem>
                  );
                })}
                <ListGroupItem>
                  <h2>Write a review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={onReviewSubmit}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select ...</option>
                          <option value="1">1 - poor</option>
                          <option value="2">2 - fair</option>
                          <option value="3">3 - good</option>
                          <option value="4">4 - very good</option>
                          <option value="5">5 - excellent</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label className="mt-3">Add Comment</Form.Label>
                        <Form.Control
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          as="textarea"
                          aria-label="With textarea"
                        />
                      </Form.Group>
                      <Button type="submit" className="mt-3">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      You need to <Link to="/signIn">Sign In</Link> to add a
                      review
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
