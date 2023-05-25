import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

function Home() {
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
                <h1>HOME</h1>
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default Home;