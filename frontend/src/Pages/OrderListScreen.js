import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { listOrders } from "../actions/orderActions";
import { ORDER_LIST_RESET } from "../types/orderTypes";
import { LinkContainer } from "react-router-bootstrap";

const OrderListScreen = () => {
  const orderList = useSelector((state) => state.orders);
  const { error, loading, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch({ type: ORDER_LIST_RESET });
    if (!userInfo.isAdmin) {
      history("/signIn");
    } else {
      dispatch(listOrders());
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <Message>You got no orders</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr className="m-1">
                      <td>{order._id}</td>
                      <td>{order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <i
                            class="fa-solid fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            class="fa-solid fa-xmark"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <i
                            class="fa-solid fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            class="fa-solid fa-xmark"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button>Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default OrderListScreen;
