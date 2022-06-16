import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import ItemCreate from "./components/pages/item_create/ItemCreate";
import ItemDetail from "./components/pages/item_detail/ItemDetail";
import ItemEdit from "./components/pages/item_edit/ItemEdit";
import ItemList from "./components/pages/item_list/ItemList";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <div className="content">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/item/edit/:id" element={<ItemEdit />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/item/create/" element={<ItemCreate />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
