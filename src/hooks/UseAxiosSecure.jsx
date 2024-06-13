import axios from "axios";
import UseUserAuthInfo from "./UseUserAuthInfo";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

// Create an axios instance
const axiosSecure = axios.create({
    baseURL: 'https://b9a12-server-side-mdsabbiralmamon.vercel.app',
    withCredentials: true
});

const UseAxiosSecure = () => {
    // Destructure logOutUser from custom hook
    const { logOutUser } = UseUserAuthInfo();
    // Get navigate function from react-router-dom
    const navigate = useNavigate();

    // Callback to handle response errors
    const handleResponseError = useCallback((error) => {
        console.log('Error tracked in the interceptor', error.response);
        if (error.response.status === 401 || error.response.status === 403) {
            console.log('Logged out the user');
            logOutUser()
                .then(() => { 
                    navigate('/signin');
                })
                .catch(error => console.log(error));
        }
    }, [logOutUser, navigate]);

    // useEffect to setup axios interceptor
    useEffect(() => {
        // Add response interceptor
        const interceptor = axiosSecure.interceptors.response.use(
            response => response,
            handleResponseError
        );

        // Eject interceptor on cleanup
        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };
    }, [handleResponseError]);

    return axiosSecure;
};

export default UseAxiosSecure;