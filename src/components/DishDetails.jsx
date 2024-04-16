// DishDetails.js
import React from "react";
import Card from "react-bootstrap/Card";

function DishDetails({ dish, onClick }) {
  const handleClick = () => {
    onClick(dish.idMeal); // Call the onClick function passed from DishList with the dish id
  };

  return (
    <div onClick={handleClick}>
      <Card style={{ width: "18rem", cursor: "pointer" }}> {/* Add cursor pointer for visual feedback */}
        <Card.Img variant="top" src={dish.strMealThumb} />
        <Card.Body>
          <Card.Title>{dish.strMeal}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DishDetails;
