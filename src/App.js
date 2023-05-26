import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyCollection from "./pages/MyCollection";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Container, Row, Col } from 'reactstrap';
import axios from "axios";
import Register from "./pages/Register";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mycollection" element={<MyCollection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App