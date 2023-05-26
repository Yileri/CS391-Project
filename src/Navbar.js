import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {

  const navbarStyle = {
    top: 0,
    background: '#f5f5f5',
    height: '180vh',
    padding: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
    'font-size': '25px',
    anchor: 'left',
  };

  const linkStyle = {
    color: '#000',
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
    fontFamily: 'Bahnschrift Light',
  };



  return (
    <nav style={navbarStyle}>
      <ul style={listStyle}>
        <h3 style={{textAlign: 'center'}}>{sessionStorage.getItem('username')}</h3>
        <hr />
        <li className='item'><CustomLink to="/" style={linkStyle}>Home</CustomLink></li>
        <li className='item'><CustomLink to="/mycollection" style={linkStyle}>My Collection</CustomLink></li>
        <li className='item'><CustomLink to='/login' style={linkStyle}>Log Out</CustomLink></li>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
