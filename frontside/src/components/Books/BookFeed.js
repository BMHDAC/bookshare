import React from 'react'
import Booknav from'./Booknav'

const BookFeed = ({Books}) => {
  return (
    <>
    {Books.map(Book => (
        <Booknav key={Book._id} Book = {Book}/>
    ) )}
    </>
  )
}

export default BookFeed