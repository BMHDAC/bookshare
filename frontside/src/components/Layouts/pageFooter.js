import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../customHooks/useAuth"
const pageFooter = () => {
    const {auth} = useAuth()

    const navigate = useNavigate()
    const pathname = useLocation()

    let goHomeButton =  null

    const gohome = ( ) => {navigate('/main')}

    if(pathname !== '/main') {
        goHomeButton = (
            <button>
                title="Home"
                onClick={gohome}
            </button>
        )
    }

    const content = (
        <footer>
            {goHomeButton}
            <p>Current User: {auth.email}</p>
        </footer>
    )


    return content
}

export default pageFooter