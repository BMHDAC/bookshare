import { useRef, useState, useEffect,useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import useAuth from '../../customHooks/useAuth';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';

import axios from '../../privateApi/axios';

const Login = () => {
    const { setAuth,persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'


    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth/login',
                {email,password},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken
            const fullname = response.data.fullname
            setAuth({ email, password, accessToken, fullname });
            setEmail('');
            setPassword('');
            navigate('/main');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
                toast.error(errMsg)
                
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
                toast.error(errMsg)
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
                toast.error(errMsg)
            } else {
                setErrMsg('Login Failed');
                toast.error(errMsg)
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev)
    }

    useEffect(() => {
       localStorage.setItem("persist",persist)
    })

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
                <div>
                    <input
                    type='checkbox'
                    id="persist"
                    onChange={togglePersist}
                    checked={persist}
                    ></input>
                    <label htmlFor='persist'>Trust this device</label>
                </div>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Login