// DishList.js
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import SingleDish from "./SingleDish";
import DishDetails from "./DishDetails";
import { Container, Row, Col } from "react-bootstrap";

function DishList({ keyWord }) {
  const [dishes, setDishes] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [clickedDishId, setClickedDishId] = useState(null);
  const [numColumns, setNumColumns] = useState(3);
  const dishRefs = useRef([]);
  const containerRef = useRef(null);

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
          setDishes([]);
        });
    }
  }, [keyWord]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        if (clickedDishId) {
          setNumColumns(3);
        } else {
          if (containerWidth < 576) {
            setNumColumns(1);
          } else if (containerWidth < 768) {
            setNumColumns(2);
          } else if (containerWidth < 992) {
            setNumColumns(3);
          } else if (containerWidth < 1200) {
            setNumColumns(4);
          } else {
            setNumColumns(6);
          }
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [clickedDishId]);

  const handleDishClick = (idMeal) => {
    setClickedDishId(idMeal);
    const clickedDishRef = dishRefs.current[idMeal];
    if (clickedDishRef) {
      clickedDishRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Container ref={containerRef}>
      <Row>{fetchError && <Alert variant="warning">{fetchError}</Alert>}</Row>
      <Row>
        <Col>
          <Container style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <Row lg={numColumns}>
              {dishes.map((dish) => (
                <Col key={dish.idMeal} className="mb-3">
                  <div
                    ref={(el) => (dishRefs.current[dish.idMeal] = el)}
                    onClick={() => handleDishClick(dish.idMeal)}
                  >
                    <DishDetails dish={dish} clicked={clickedDishId === dish.idMeal} />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
        {clickedDishId && (
          <Col>
            <SingleDish dishID={clickedDishId} />
          </Col>
        )}
      </Row>
    </Container>
  );
}

DishList.propTypes = {
  keyWord: PropTypes.string.isRequired,
};

export default DishList;
