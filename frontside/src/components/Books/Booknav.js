import React from 'react'
import { Link } from 'react-router-dom'

const Booknav = ({Book}) => {
  return (
    <article>
        <h2>{Book.title}</h2>
        <h3>{Book.author}</h3>
        <Link to={`http://localhost:3008/download/${Book._id}`}>Download</Link>
    </article>
  )
}

export default Booknav