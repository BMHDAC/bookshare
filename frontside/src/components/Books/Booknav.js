import React from 'react'
import fileDownload from "js-file-download"
import useAxiosPrivate from '../../customHooks/useAxiosPrivate'


const Booknav = ({Book}) => {
  
    const axiosPrivate = useAxiosPrivate()

    const downloadButton = (e) => {
      e.preventDefault()
      let bookfilename = Book.title +'.pdf'
      axiosPrivate({
        url: `http://localhost:3008/books/${Book._id}`,
        method:'get',
        responseType:"blob"
       }).then((res) => {
        fileDownload(res.data,bookfilename)
       })
       }
  return (
    <article>
        <h2>{Book.title}</h2>
        <h3>{Book.author}</h3>
        <button onClick={downloadButton}>Download</button>
    </article>
  )
}

export default Booknav