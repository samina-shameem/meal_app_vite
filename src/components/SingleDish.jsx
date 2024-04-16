// SingleDish.js
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function SingleDish({ dishID }) {
  const [dish, setDish] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    // Fetch API to get dish details
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // If data is empty, dish doesn't exist, error
        if (!data.meals || data.meals.length === 0) {
          throw new Error("No details of dish");
        } else {
          setDish(data.meals[0]); // Assuming you want to set the first meal
        }
      })
      .catch((error) => {
        // Handle errors such as network errors, server errors, or dish not found
        setFetchError(`There was a problem: ${error.message}`);
      });
  }, [dishID]);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!dish) {
    return (<h1>No dish selected</h1>); // Or a loading indicator
  }

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={dish.strMealThumb} />
        <Card.Body>
          <Card.Title>{dish.strMeal}</Card.Title>
          <Card.Text>
            {dish.strInstructions.split("\n\r").map((instr, idx) => (
              <p key={idx}>{instr}</p>
            ))}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SingleDish;

