import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from '../../privateApi/axios'
import useAuth from '../../customHooks/useAuth'
import useLogout from '../../customHooks/useLogout'




const Register = () => {
    const {auth} = useAuth();
    const logout = useLogout()

    useEffect( () => {
        if (auth.accessToken) {
             logout();
             navigate('/register')
            
        }

    },[])
    const [data,setData] = useState({
        username:'',
        email:'',
        password:'',
        firstname:'',
        lastname:''
    })
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        const {username,email,password,firstname,lastname} = data
        if(!data) {
            console.log("Please fill in the data")
        }
        try {
            const response = await axios.post('/auth/register',{username,email,password,firstname,lastname})
            if(response.data.error) {
                toast.error(response.data.error)
            } else {
                setData({})
                console.log('Register successfully')
                navigate('/login')
            }  
        } catch(error) {
            if(!error?.response) {
                toast.error("No server response")
            } else if (error.response?.status === 400) {
                toast.error("An account with this email is already existed")
            } else if (error.response?.status === 401) {
                toast.error("Please fill in all the form")
            } else if (error.response?.status === 404) {
                toast.error("Invalid data")
            }
        }

        
    }
    
  const content = (
    <div>
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>
                        <strong>Username</strong>
                    </label>
                    <input 
                    type='text'
                    placeholder='Enter username'
                    autoComplete='Off'
                    name='username'
                    value={data.username}
                    onChange={(e) => setData({...data,username:e.target.value})}
                    />
                </div>
            
                <div>
                    <label htmlFor='email'>
                        <strong>Email</strong>
                    </label>
                    <input 
                    type='text'
                    placeholder='Enter email'
                    autoComplete='Off'
                    name='email'
                    value={data.email}
                    onChange={(e) => setData({...data,email:e.target.value})}
                    />
                </div>
            
                <div>
                    <label htmlFor='password'>
                        <strong>Password</strong>
                    </label>
                    <input 
                    type='password'
                    placeholder='Enter password'
                    autoComplete='Off'
                    name='password'
                    value={data.password}
                    onChange={(e) => setData({...data,password:e.target.value})}
                    />
                </div>
            
                <div>
                    <label htmlFor='firstname'>
                        <strong>firstname</strong>
                    </label>
                    <input 
                    type='text'
                    placeholder='Enter firstname'
                    autoComplete='On'
                    name='firstname'
                    value={data.firstname}
                    onChange={(e) => setData({...data,firstname:e.target.value})}
                    />
                </div>
            
                <div>
                    <label htmlFor='lastname'>
                        <strong>Lastname</strong>
                    </label>
                    <input 
                    type='text'
                    placeholder='Enter lastname'
                    autoComplete='On'
                    name='lastname'
                    value={data.lastname}
                    onChange={(e) => setData({...data,lastname:e.target.value})}
                    />
                </div>
                <button type='submit'>Register</button>
                <span className="line">
                   <Link to='/login'>Already have an account</Link>
                </span>

            </form>
        </div>
    </div>
  )
  return content
}

export default Register