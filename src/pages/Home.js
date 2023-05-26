import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';

function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        const username = sessionStorage.getItem('username')
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

     const addComic = async (newComic) => {
      try {
        // Fetch the user data from the JSON file
        const response = await axios.get('http://localhost:3001/users');
        const users = response.data;
  
        // Find the user by ID
        const user = users.find((user) => user.id === sessionStorage.getItem('username'));
  
        if (user) {
          const collection = await axios.get(`http://localhost:3001/users/${sessionStorage.getItem('username')}`)
          const collectionData = collection.data.collection

          if (!collectionData.includes(newComic)) {
          
          user.collection.push(newComic);
          
          await axios.put(`http://localhost:3001/users/${sessionStorage.getItem('username')}`, user);
  
          
          setComic([...comic]);

          alert('Added to the Collection')
          } else {
            alert('Already in Collection')
          }
          
          
        }
      } catch (error) {
        alert(error);
      }
    };
    

    return (
    <Container>
        <Row>
          <Col md={2} className='d-none d-md-block'>
            <Navbar />
          </Col>
          <Col sm={12} md={10}>
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
                        <Button onClick={() => addComic(item.id)}>
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