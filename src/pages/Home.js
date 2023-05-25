import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navbar from '../Navbar';

function Home() {
    return (
    <Container>
        <Row>
          <Col sm={4}>
            <Navbar />
          </Col>
          <Col sm={4}>
            <div className="container">
                <h1>HOME</h1>
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default Home;