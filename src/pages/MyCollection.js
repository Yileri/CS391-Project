import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyCollection() {
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
        const userResponse = await axios.get('http://localhost:3001/users');
        const users = userResponse.data;
          
        const user = users.find((user) => user.id === sessionStorage.getItem('username'));

        if (user) {
          const comicsResponse = await axios.get('http://localhost:3001/comics');
          const comics = comicsResponse.data;

          const userComics = comics.filter((comic) => user.collection.includes(comic.id))
          
          setComic(userComics);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    
    fetchData();
   }, []);

   const removeComic = async (byeComic) => {
    try {
        // Fetch the user data from the JSON file
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;
  
        // Find the user by ID
      const user = users.find((user) => user.id === sessionStorage.getItem('username'));
  
      if (user) {
        const collection = await axios.get(`http://localhost:3001/users/${sessionStorage.getItem('username')}`)
        const collectionData = collection.data.collection

        const index = collectionData.indexOf(byeComic)

        if (index !== -1) {
          collectionData.splice(index, 1)
          await axios.put(`http://localhost:3001/users/${sessionStorage.getItem('username')}`, user);
          setComic([...comic]);
          alert('Removed from the Collection')
        } 
      }
    } catch (error) {
      alert(error);
    }
  };


  return (
  <Container>
        <Row>
          <Col sm={2}>
            <Navbar />
          </Col>
          <Col sm={10}>
            <div className="container">
              <h1>MY COLLECTION</h1>
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
                        <Button onClick={() => removeComic(item.id)}>
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
  }