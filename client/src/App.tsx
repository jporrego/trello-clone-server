import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ItemCreate from "./components/pages/item_create/ItemCreate";
import ItemDetail from "./components/pages/item_detail/ItemDetail";
import ItemList from "./components/pages/item_list/ItemList";

function App() {
  return (
    <div className="App">
      <nav>Navbar</nav>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/item/edit/:id" element={<div>Edit</div>} />
        <Route path="/item/detail/:id" element={<ItemDetail />} />
        <Route path="/item/create/" element={<ItemCreate />} />
      </Routes>
    </div>
  );
}

export default App;
