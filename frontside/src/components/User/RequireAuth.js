import { Outlet, Navigate,useLocation } from "react-router-dom";

import useAuth from "../../customHooks/useAuth";

const RequireAuth = () => {
    const {auth} = useAuth()
    const location = useLocation()
    return (
        auth?.accessToken
           ?<Outlet/>
           :<Navigate to="/login"/>

    
    )
}

export default RequireAuth