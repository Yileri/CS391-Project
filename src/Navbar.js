import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {
    return (
      <nav className="nav">
        <ul>
            <h3><i>{sessionStorage.getItem('username')}</i></h3>
            <hr></hr>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/mycollection">My Collection</CustomLink>
            <CustomLink to='/login'>Log Out</CustomLink>
        </ul>
      </nav>
    )
  }
  
  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }