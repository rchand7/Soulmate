import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://b9a12-server-side-mdsabbiralmamon.vercel.app',
});

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;