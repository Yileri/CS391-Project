import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';

function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        let username = sessionStorage.getItem('username')
        if (username === '' || username === null) {
            navigate('/login')
        }
    }, []);

    const [comic, setComic] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/comics');
          console.log(response.data);
          setComic(response.data);
        } catch (error) {
          alert(error.message);
        }
      };
    
      fetchData();
     }, []);

      /*
      return (
        <div>
          <h1>Data:</h1>
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    };
    */
    

    return (
    <Container>
        <Row>
          <Col sm={2}>
            <Navbar />
          </Col>
          <Col sm={10}>
            <div className="container">
              <h1>HOME</h1>
                <div className="card-grid">
                  {comic.map((item) => (
                    <Card key={item.id}>
                      <img 
                        alt={`${item.title}`} 
                        src={process.env.PUBLIC_URL + `/comic-covers/${item.id}.png`}
                      />
                      <CardBody>
                        <CardTitle tag="h5">
                          {item.title} #{item.number}
                        </CardTitle>
                        <CardSubtitle
                          className="mb-2 text-muted"
                          tag="h6"
                        >
                          {item.publisher}
                        </CardSubtitle>
                        <Button>
                          Add to Collection
                        </Button>
                      </CardBody>
                    </Card>
                  ))}
                </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default Home;