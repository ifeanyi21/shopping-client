import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import CSS from "./searchbar.module.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const location = useNavigate();

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
    if (searchValue.length > 0) {
      location(`/sch/${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <Form
      id={CSS.smSearch}
      className="d-flex m-3"
      style={{ width: "-webkit-fill-available" }}
      onSubmit={search}
    >
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={handleInput}
        value={searchValue}
        required
      />
      <Button type="submit" variant="contained" color="success">
        <FaSearch />
      </Button>
    </Form>
  );
}

export default Search;
