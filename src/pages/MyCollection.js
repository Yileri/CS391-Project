import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function MyCollection() {
  const navigate = useNavigate()
  useEffect(() => {
      let username = sessionStorage.getItem('username')
      if (username === '' || username === null) {
          navigate('/login')
      }
  }, []);
  return (
  <Container>
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