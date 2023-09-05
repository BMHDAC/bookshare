import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../../customHooks/useAxiosPrivate'

const Download = () => {
    const {bookId} = useParams()
    const axiosPrivate = useAxiosPrivate()

    const download = async() => {
        try {
          const res = await axiosPrivate.get(`/books/${bookId}`)
          
        } catch (error) {
          console.log(error)
        }
        
    } 
    download()
    
  return (
    <>Download</>
  )
}

export default Download