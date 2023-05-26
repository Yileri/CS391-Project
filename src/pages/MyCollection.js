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
    fetchData();
  }, [sessionStorage.getItem('username') ]);

  const fetchData = async () => {
    try {
      // Fetch the user data
      const usersResponse = await axios.get('http://localhost:3001/users');
      const users = usersResponse.data;

      // Find the specific user by ID
      const user = users.find((user) => user.id === sessionStorage.getItem('username'));

      if (user) {
        // Fetch the comics data
        const comicsResponse = await axios.get('http://localhost:3001/comics');
        const allComics = comicsResponse.data;

        // Filter the comics based on the user's collection
        const userComics = allComics.filter((comic) => user.collection.includes(comic.id));

        setComic(userComics);
      }
    } catch (error) {
      alert('Error:', error);
    }
  };

  const removeComic = async (comicId) => {
    try {
      // Fetch the user data
      const usersResponse = await axios.get('http://localhost:3001/users');
      const users = usersResponse.data;

      // Find the specific user by ID
      const user = users.find((user) => user.id === sessionStorage.getItem('username'));

      if (user) {
        // Remove the comic ID from the user's collection
        user.collection = user.collection.filter((comic) => comic !== comicId);

        // Update the user data in the JSON file
        await axios.put(`http://localhost:3001/users/${user.id}`, user);

        // Update the comics state by refetching the data
        fetchData();

        alert('Removed from the Collection');
      }
    } catch (error) {
      alert('Error:', error);
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
                          Remove from Collection
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