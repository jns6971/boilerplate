import React from 'react'
import Link from 'gatsby-link'
import './index.css';

const Header = ({ siteTitle }) => (
  <nav
    style={{
      background: 'black',
      marginBottom: '1.45rem',
    }}
    className='navigation'
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Jordan Simon
        </Link>
      </h2>
    </div>
  </nav>
)

export default Header
