import axios from "../privateApi/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth} = useAuth();
    const {setPersist} = useAuth()

    const logout = async () => {
        setPersist(false)
        setAuth({});
        try {
            const response = await axios.post('/auth/logout', {
                withCredentials:true
            })
            console.log(response.data)
        } catch (err) {
            console.error(err)
        }
    }
    return logout
}

export default useLogout