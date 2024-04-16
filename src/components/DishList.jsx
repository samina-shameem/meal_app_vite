// DishList.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import SingleDish from "./SingleDish";
import DishDetails from "./DishDetails";
import { Container, Row, Col } from "react-bootstrap";

function DishList({ keyWord }) {
  const [dishes, setDishes] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [clickedDishId, setClickedDishId] = useState(null);
  

  useEffect(() => {
    if (keyWord !== null && keyWord !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyWord}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (!data.meals || data.meals.length === 0) {
            throw new Error(`No dish found with the keyword: ${keyWord}`);
          } else {
            setDishes(data.meals);
            setFetchError(null);
            setClickedDishId(null);
          }
        })
        .catch((error) => {
          setFetchError(`There was a problem: ${error.message}`);
        });
    }
  }, [keyWord]);

  const onDishClick = (idMeal) => {
    setClickedDishId(idMeal);

  };

  return (
    <Container>
      <Row>{fetchError && <Alert variant="warning">{fetchError}</Alert>}</Row>
      <Row >
        {dishes.map((dish) => (
          
          <Col key={dish.idMeal} >
            <div  onClick={() => onDishClick(dish.idMeal)}>
            <DishDetails dish={dish} />
            </div>
          </Col>
          
        ))}

        <Col>
          {!fetchError && clickedDishId && <SingleDish dishID={clickedDishId} />}
        </Col>
      </Row>
    </Container>
  );
}

export default DishList;
