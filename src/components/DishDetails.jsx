// DishDetails.js
import React from "react";
import Card from "react-bootstrap/Card";

function DishDetails({ dish, clicked }) {
  return (
    <Card bg={clicked ? "success" : "Light"} style={{ width: "10rem", cursor: "pointer" }}>
      <Card.Img variant="top" src={dish.strMealThumb} />
      <Card.Body>
        <Card.Title>{dish.strMeal}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default DishDetails;
