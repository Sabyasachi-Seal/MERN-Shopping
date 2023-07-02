import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { addToCartAction, removeCartAction } from "../actions/cartActions";
import Message from "../components/Message";

function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const history = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(addToCartAction(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCart = (id) => {
    dispatch(removeCartAction(id));
  };

  const onCheckout = () => {
    // history("/signIn?redirect=hello");
    history("/signIn?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            {" "}
            <Link to="/">Go Back</Link> Sorry you got no items in the cart!
          </Message>
        ) : (
          <ListGroup variant="flush" className="p-3 w-8">
            {cartItems.map((item) => {
              return (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid rounded alt={item.image} />
                    </Col>
                    <Col md={2}>
                      <Link to={`/product/${id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCartAction(
                              item.product,
                              Number(e.target.value)
                            )
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCart(item.product)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 && (
        <Col md={4}>
          <Card>
            <ListGroup variant="flush" className="p-4">
              <ListGroupItem>
                <Row>
                  <Col>
                    <h2>{`SubTotal (${cartItems.reduce(
                      (acc, item) => acc + item.qty,
                      0
                    )}) items`}</h2>
                    {`Total :  $${cartItems
                      .reduce((acc, item) => acc + item.price * item.qty, 0.0)
                      .toFixed()}`}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  // disabled={cartItems.length === 0}
                  className="btn-block w-100 mb-15"
                  onClick={onCheckout}
                >
                  Proceed to Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default CartScreen;
