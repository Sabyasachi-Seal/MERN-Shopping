import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import Searchbox from "../Pages/Searchbox";

const Header = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history("/signIn");
  };
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Container>
          <Link to="/">
            <Navbar.Brand>W SHOPFY</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {userInfo && (
            <div className="d-flex">
              <Searchbox />
            </div>
          )}

          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {userInfo && (
                <Nav.Link>
                  <Link to="/cart">
                    <i class="fa-solid fa-cart-shopping"></i> Cart
                  </Link>
                </Nav.Link>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="userProfile">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/signIn">
                  <Nav.Link eventKey={2}>
                    <i class="fa-solid fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="Admin">
                  <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                  <NavDropdown.Item href="/admin/orders">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/products">
                    Products
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
