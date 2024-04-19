import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function AppHeader({ setSearchWord }) {
  const [query, setQuery] = useState("");
  const [keywordError, setkeywordError] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    // check if empty
    if (query === "") {
      setkeywordError("Search word is empty");
      return;
    }
    //reset error message after the change
    setkeywordError("");
    setSearchWord(query);
  };
  const handleChange = (event) => {
    const newValue = event.target.value;

    //reset error message after the change
    if (query !== "") {
      setkeywordError("");
    }
    setQuery(newValue);
  };

  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between" fixed="top">
        <Container>
          <Navbar.Brand>Meal-App</Navbar.Brand>
          <Col xs="auto">
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Dish name"
                  className="mr-sm-2"
                  onChange={handleChange}
                />
              </Col>
              <Col xs="auto">
                <Button onClick={handleSearch}>Search</Button>
              </Col>
            </Row>
          </Col>
        </Container>
      </Navbar>
      <div style={{ marginTop: "56px" }}>
        {keywordError && <Alert variant="warning">{keywordError}</Alert>}
      </div>
    </>
  );
}

export default AppHeader;
