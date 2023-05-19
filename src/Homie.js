import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function Homie() {
    return (
        <Container>
            <Row>
                <Col sm={4}>
                    <a href='#'>Home</a>
                    <br/>
                    <a href='#'>My Collection</a>
                    <br/>
                    <a href='#'>Log Out</a>
                </Col>
                <Col sm={4}>
                    <div className="column-content">
                        <h2>Column 2</h2>
                        <p>This is the content for column 2.</p>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className="column-content">
                        <h2>Column 3</h2>
                        <p>This is the content for column 3.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Homie;