import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../customHooks/useAuth"
const PageFooter = () => {
    const {auth} = useAuth()

    const navigate = useNavigate()
    const pathname = useLocation()

    let goHomeButton =  null

    const gohome = ( ) => {navigate('/main')}

    if(pathname !== '/main') {
        goHomeButton = (
            <button
                title="Home"
                onClick={gohome}
            >
                Home
            </button>
        )
    }

    const content = (
        <footer>
            {goHomeButton}
            <p>Current User: {auth.fullname}</p>
        </footer>
    )


    return content
}

export default PageFooter