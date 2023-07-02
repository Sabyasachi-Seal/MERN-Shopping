import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deletedUser = useSelector((state) => state.deletedUsers);
  const { success: successPay } = deletedUser;

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history("/signIn");
    }
  }, [dispatch, successPay]);

  const onDeleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Users</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIl</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr className="m-1">
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i class="fa-solid fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i class="fa-solid fa-xmark" style={{ color: "red" }}></i>
                  )}
                </td>
                <td className="m-2">
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    onClick={() => onDeleteHandler(user._id)}
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
    </>
  );
};

export default UserListScreen;
