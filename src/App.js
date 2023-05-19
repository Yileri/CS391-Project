import React from "react";
import Home from "./pages/Home";
import MyCollection from "./pages/MyCollection";
import Navbar from "./Navbar";
import { Route, Routes} from "react-router-dom"
import { Container, Row, Col } from 'reactstrap';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mycollection" element={<MyCollection />} />
        </Routes>
      </div>
    </>
  )
}

export default App