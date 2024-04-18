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
  const [numColumns, setNumColumns] = useState(3); // Initial number of columns
  const dishRefs = useRef([]); // Ref for storing dish item refs
  const containerRef = useRef(null); // Ref for the dish list container

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
        // Calculate the number of columns based on container width
        if (clickedDishId) {
          // If a dish is clicked, reduce the number of columns to 3
          setNumColumns(3);
        } else {
          setNumColumns(6);          
        }
      }
    };

    handleResize(); // Call handleResize initially
    window.addEventListener("resize", handleResize); // Add resize event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, [clickedDishId]); // Add clickedDishId to the dependency array

  // Function to handle clicking on a dish item
  const handleDishClick = (idMeal) => {
    setClickedDishId(idMeal);
    // Perform additional actions as needed
    // For example, you can focus on the clicked dish item
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
            <Row lg={numColumns}> {/* Displaying dishes dynamically based on the number of columns */}
              {dishes.map((dish) => (
                <Col key={dish.idMeal} className="mb-3">
                  <div
                    ref={(el) => (dishRefs.current[dish.idMeal] = el)} // Assign ref to the dish item
                    onClick={() => handleDishClick(dish.idMeal)} // Handle click event
                  >
                    <DishDetails dish={dish} />
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
