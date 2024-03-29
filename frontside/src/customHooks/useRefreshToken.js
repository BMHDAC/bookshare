import axios from '../privateApi/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                email:response.data.email,
                accessToken: response.data.accessToken,
                fullname: response.data.fullname
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;