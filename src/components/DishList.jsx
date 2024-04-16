import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert'; // Assuming you're using Bootstrap for Alert
import SingleDish from './SingleDish'; // Assuming SingleDish is defined in another file
import DishDetails from './DishDetails'; // Assuming DishDetails is defined in another file

function DishList({ keyWord }) {
  const [dishes, setDishes] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [clickedDishId, setClickedDishId] = useState(null);

  useEffect(() => {
    // if empty string do not fetch, just set dishes as empty
    if (keyWord === '') {
      setFetchError('Search keyword is empty');
      return;
    }

    // Fetch API to search dishes
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyWord}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // If data is empty, no dish found, show appropriate error
        if (!data.meals || data.meals.length === 0) {
          throw new Error(`No dish found with the keyword: ${keyWord}`);
        } else {
          setDishes(data.meals);
        }
      })
      .catch((error) => {
        // Handle errors such as network errors, server errors, or no dish found
        setFetchError(`There was a problem: ${error.message}`);
      });
  }, [keyWord]);

  const onDishClick = (idMeal) => {
    setClickedDishId(idMeal);
  };

  return (
    <>
      {fetchError && <Alert variant="warning">{fetchError}</Alert>}
      {clickedDishId && <SingleDish idMeal={clickedDishId} />}
      {dishes.map((dish) => (
        <DishDetails key={dish.idMeal} dish={dish} onClick={() => onDishClick(dish.idMeal)} />
      ))}
    </>
  );
}

DishList.propTypes = {
  keyWord: PropTypes.string.isRequired,
};

export default DishList;
