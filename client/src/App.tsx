import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ItemList from "./components/pages/item_list/ItemList";

function App() {
  return (
    <div className="App">
      <nav>Navbar</nav>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/item/edit/:id" element={<div>Edit</div>} />
        <Route path="/item/create/" element={<div>Create</div>} />
      </Routes>
    </div>
  );
}

export default App;
