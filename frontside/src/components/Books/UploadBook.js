import React, { useState, useRef } from 'react'
import axios from '../../privateApi/axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UploadBook = () => {
  const [name,setName] = useState("")
  const [author,setAuthor] = useState("")
  const [title,setTitle] = useState("")
  const fileInputRef = useRef(null)
const navigate = useNavigate()
const handleUpload = async(e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("name", name)
    formData.append("author", author)
    formData.append("title", title)
    formData.append("file",fileInputRef.current.files[0])

    if(!formData) {
        console.log("Please fill in the data")
    }
    try {
        const {data} = await axios.post('/uploads',formData)
        if(data.error) {
            toast.error(data.error)
        } else {
            console.log(data.message)
            navigate('/books')
        }  
    } catch(error) {
        console.log(error)
    }

    
}
  return (
    <div>
        <div>
            <h2>Uploads</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label htmlFor='name'>
                        <strong>Name</strong>
                    </label>
                    <input 
                    type='text'
                    placeholder='Enter name'
                    autoComplete='Off'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
            
                <div>
                    <label htmlFor='author'>
                        <strong>Author</strong>
                    </label>
                    <input 
                    type='text'
                    placeholder='Enter Author'
                    autoComplete='Off'
                    name='author'
                    onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
            
                <div>
                    <label htmlFor='title'>
                        <strong>Book's title</strong>
                    </label>
                    <input 
                    type='text'
                    placeholder='Title'
                    autoComplete='Off'
                    name='title'
                    
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>  
                <div>
                    <label htmlFor='file'>
                        <strong>Select a file</strong>
                    </label>
                    <input 
                    type='file'
                    ref={fileInputRef}
                    />
                </div>
                <button type='submit'>Uploads</button>
            </form>
        </div>
    </div>
  )
}

export default UploadBook