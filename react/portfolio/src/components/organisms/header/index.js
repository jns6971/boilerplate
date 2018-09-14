import React from 'react';
import './index.css';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
    className='portfolioHero'
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ 
        margin: 0,
        color: 'white',
        textDecoration: 'none'
      }}>
        {siteTitle}
      </h1>
    </div>
  </header>
)

export default Header
