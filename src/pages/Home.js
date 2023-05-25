import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        let username = sessionStorage.getItem('username')
        if (username === '' || username === null) {
            navigate('/login')
        }
    }, []);

    const [comic, setComic] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/comics');
          console.log(response.data);
          setComic(response.data);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
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
          <Col sm={4}>
            <Navbar />
          </Col>
          <Col sm={4}>
            <div className="container">
              <h1>HOME</h1>
              <ul>
                {comic.map((item) => (
                  <li key={item.id}>
                    <div>{item.publisher}</div>
                    <div>{item.title} #{item.number}</div>
                    </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default Home;