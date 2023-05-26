import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  }, [sessionStorage.getItem('username')]);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get('http://localhost:3001/users');
      const users = usersResponse.data;

      const user = users.find((user) => user.id === sessionStorage.getItem('username'));

      if (user) {
        const comicsResponse = await axios.get('http://localhost:3001/comics');
        const allComics = comicsResponse.data;

        const userComics = allComics.filter((comic) => user.collection.includes(comic.id));

        setComic(userComics);
      }
    } catch (error) {
      toast.error('Error:' + error, {position: 'top-center'});
    }
  };

  const removeComic = async (comicId) => {
    try {
      const usersResponse = await axios.get('http://localhost:3001/users');
      const users = usersResponse.data;


      const user = users.find((user) => user.id === sessionStorage.getItem('username'));

      if (user) {

        user.collection = user.collection.filter((comic) => comic !== comicId);

        await axios.put(`http://localhost:3001/users/${user.id}`, user);

        fetchData();

        toast.info('Removed from the Collection', {position: 'top-center'});
      }
    } catch (error) {
      toast.error('Error:' + error , {position: 'top-center'});
    }
  };



  return (
    <Container>
      <ToastContainer/>
      <Row>
        <Col md={2} className='d-none d-md-block'>
          <Navbar />
        </Col>
        <Col sm={12} md={10}>
          <div className="container">
            <h1 style={{ fontFamily: 'Bahnschrift Light', fontSize: '60px', textAlign: 'center' }}>MY COLLECTION</h1>
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