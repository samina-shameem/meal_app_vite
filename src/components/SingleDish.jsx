// SingleDish.js
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

function SingleDish({ dishID }) {
  const [dish, setDish] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.meals || data.meals.length === 0) {
          throw new Error("No details of dish");
        } else {
          setDish(data.meals[0]);
        }
      })
      .catch((error) => {
        setFetchError(`There was a problem: ${error.message}`);
      });
  }, [dishID]);

  return (
    <div>
      {fetchError && <Alert variant="warning">{fetchError}</Alert>}
      {!fetchError && (
        <Card >
          <Card.Img variant="top" src={dish && dish.strMealThumb} />
          <Card.Body>
            <Card.Title>{dish && dish.strMeal}</Card.Title>
            <Card.Text>
              {dish && dish.strInstructions.split("\n\r").map((instr, idx) => (
                <p key={idx}>{instr}</p>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default SingleDish;