import axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Row,
  Col,
  ListGroup,
  Image,
  ListGroupItem,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { orderDeliver, orderdetails, orderPay } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../types/orderTypes";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const [sdkready, setSdkready] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPayDetail = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPayDetail;
  const ordersDelivered = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = ordersDelivered;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { id } = useParams();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkready(true);
      };
      document.body.appendChild(script);
    };
    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(orderdetails(id));
    } else {
      if (!order.isPaid) {
        addPayPalScript();
      } else {
        setSdkready(true);
      }
    }
  }, [order, id, successPay, successDeliver, dispatch]);

  const successHandler = (paymentResult) => {
    dispatch(orderPay(id, paymentResult));
  };

  const deliverhandler = () => {
    dispatch(orderDeliver(order));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger"></Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Order id:{order._id}</h2>
              <p>
                <strong>Name :</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email :</strong>
                <a href={`mailTo:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address :</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Paid at {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method :</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid at {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>My Orders</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <>
                  <ListGroup>
                    {order.orderItems.map((item, index) => {
                      return (
                        <ListGroupItem variant="flush">
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                rounded
                                fluid
                                alt={item.name}
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x {item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                </>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="p-4">
            <ListGroup variant="flush"></ListGroup>

            <ListGroupItem>
              <h2>Order Summary</h2>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              {loadingPay && <Loader />}
              {!sdkready ? (
                <Loader />
              ) : (
                !order.isPaid && (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successHandler}
                  />
                )
              )}
            </ListGroupItem>
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroupItem>
                  <Button
                    type="button"
                    className="btn btn-block w-100 mt-3"
                    onClick={deliverhandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroupItem>
              )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
