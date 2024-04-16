import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";

function AppHeader() {
  return (
    
    <Navbar className="bg-body-tertiary justify-content-between">
<Container >
    <Navbar.Brand href="#home">Meal-App</Navbar.Brand>

      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Dish name"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
      </Container>
    </Navbar>
    

  )
}

export default AppHeader
