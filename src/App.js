import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyCollection from "./pages/MyCollection";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Container, Row, Col } from 'reactstrap';
import axios from "axios";

/*const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Yileri/CS391-JSON/comics'
})
*/

function App() {
  fetchData();
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mycollection" element={<MyCollection />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    /*
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
    */
  )
}

const fetchData = async () => {
  try {
    const response = await axios.get('https://my-json-server.typicode.com/Yileri/CS391-JSON/comics');
    const jsonData = response.data;
    // Process the JSON data
    console.log(jsonData);
  } catch (error) {
    console.error(error);
  }
};

export default App