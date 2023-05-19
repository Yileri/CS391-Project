import React from "react";
import Home from "./pages/Home";
import MyCollection from "./pages/MyCollection";
import Navbar from "./Navbar";
import { Route, Routes} from "react-router-dom"
import { Container, Row, Col } from 'reactstrap';

function App() {
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Navbar />
        </Col>
        <Col sm={4}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mycollection" element={<MyCollection />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App