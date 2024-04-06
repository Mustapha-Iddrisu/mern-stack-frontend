import React, { useEffect, useState } from "react";
import "./App.css";
import CreateUser from "./CreateUser.jsx";
import AllUsers from "./AllUsers.jsx";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Update from "./Update.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllUsers />}></Route>
          <Route path="/add-user" element={<CreateUser />}></Route>
          <Route path="/update-user/:id" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
