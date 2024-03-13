import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/?search=${search}`);
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex mx-auto input-group w-50">
      <Form.Control
        size="sm"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></Form.Control>

      <Button
        size="sm"
        type="submit"
        className="input-group-append bg-success btn btn-success px-2"
      >
        <i className="fas fa-search" />
      </Button>
    </Form>
  );
};

export default SearchBar;