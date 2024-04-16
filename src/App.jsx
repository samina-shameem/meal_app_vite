// App.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AppHeader from "./components/AppHeader";
import DishList from "./components/DishList";

function App() {
  const [searchWord, setSearchWord] = useState(null);

  return (
    <>
      <AppHeader setSearchWord={setSearchWord} />
      <DishList keyWord={searchWord}/>
    </>
  );
}

export default App;

