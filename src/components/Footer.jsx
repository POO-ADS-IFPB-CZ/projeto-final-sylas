import React from 'react';

function Footer() {
  return (
    <footer style={{ padding: '1rem', background: '#eee', marginTop: '2rem' }}>
      <p>&copy; {new Date().getFullYear()} Meu Projeto Avançado</p>
    </footer>
  );
}

export default Footer;
