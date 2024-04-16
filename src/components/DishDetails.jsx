// DishDetails.js
import React from "react";
import Card from "react-bootstrap/Card";

function DishDetails({ dish }) {
  return (
    <Card style={{ width: "18rem", cursor: "pointer" }}>
      <Card.Img variant="top" src={dish.strMealThumb} />
      <Card.Body>
        <Card.Title>{dish.strMeal}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default DishDetails;
