import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navbar from '../Navbar';

export default function MyCollection() {
    return (<Container>
      <Row>
        <Col sm={4}>
          <Navbar />
        </Col>
        <Col sm={4}>
          <div className="container">
              <h1>MY COLLECTION</h1>
          </div>
        </Col>
      </Row>
    </Container>)
  }