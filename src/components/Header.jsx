import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../services/UserProvider';

function Header() {
  const { user } = useUser();

  // rota muda de acordo com login
  const homePath = user.email ? "/home" : "/";
  const homeLabel = user.email ? "Home" : "Inicío";

  return (
    <header className='Header'>
      <h1>Sylas</h1>
      <nav>
        <Link to={homePath} className='Header-link'>{homeLabel}</Link>
        <Link to="/about" className='Header-link'>Sobre</Link>
        <Link to="/docs" className='Header-link'>Documentação</Link>
      </nav>
    </header>
  );
}

export default Header;
