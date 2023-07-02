import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Searchbox = () => {
  const [keyword, setKeyword] = useState("");
  const history = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!keyword) {
      history("/");
    } else {
      history(`/search/${keyword}`);
    }
  };
  return (
    <Form onSubmit={onSubmitHandler} className="d-flex search">
      <Form.Group as={Col}>
        <Form.Control
          type="text"
          placeholder="Search Product.."
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
      </Form.Group>

      <Button type="submit" variant="outline" className="submit-btn">
        Search
      </Button>
    </Form>
  );
};

export default Searchbox;
