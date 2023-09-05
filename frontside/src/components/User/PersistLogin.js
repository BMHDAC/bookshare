import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react"
import useRefreshToken from "../../customHooks/useRefreshToken";
import useAuth from "../../customHooks/useAuth";

const PersistLogin = () => {
    const[isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken();
    const {persist, auth} = useAuth()

    useEffect(() => {
        let isMounted = true;

        
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err)
            }
            finally {
                isMounted&&setIsLoading(false)
            }
        }
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false
    },[])

    useEffect(() => {
        
        console.log(`isLoading:${isLoading}`)
        console.log(`aT:${JSON.stringify(auth?.accessToken)}`)
    },[isLoading])

    return (
        <>
         {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin