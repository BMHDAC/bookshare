import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

import BookFeed from './BookFeed'
import useAxiosPrivate from '../../customHooks/useAxiosPrivate'



const Bookpage = () => {
  
  const [Books, setBooks] = useState([])
  const axiosPrivate = useAxiosPrivate()  
  useEffect(() => {
    let isMounted = true;
    const controllers = new AbortController()
    const getBooks = async() => {
      try {
        const response = await axiosPrivate.get('/books/all', {
          signal:controllers.signal
        })
        console.log(response.data)
        isMounted&&setBooks(response.data)

      } catch (error) {
        console.log(error)
      }
    }
    getBooks();

    return () => {
      isMounted= false;
      controllers.abort();
    }
  },[])
  return (
    <main>
      {Books.length? (
        <BookFeed Books ={Books}/>
      ) :(<p>No Book to display</p>)}
      
    </main>
  )
}

export default Bookpage