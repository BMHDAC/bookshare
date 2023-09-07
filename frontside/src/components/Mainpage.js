import { useNavigate, Link } from "react-router-dom";
import useLogout from "../customHooks/useLogout";
import useAuth from "../customHooks/useAuth";

const Mainpage = () => {
    
    const navigate = useNavigate();
    const logout = useLogout()
    const {auth} = useAuth()
    const signOut = async () => {
        await logout();
        navigate('/main')
    }
    let logoutButton = null
    if (auth.accessToken) {
        logoutButton = (
            <button onClick={signOut}>Sign Out</button>
        )
    }
    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>loginState</p>
            <br />
            <Link to="/books">Go to the Books library</Link>
            <br />
            <Link to="/uploads">Go to the uploads page</Link>
            <br />
            <Link to="/login">Go to the login</Link>
            <br />
            <Link to="/register">Go to the register page</Link>
            <div>
               {logoutButton}
            </div>
        </section>
    )
}

export default Mainpage