import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import UseAxiosPublic from "./UseAxiosPublic";

const UseUserAuthInfo = () => {
    const axiosPublic = UseAxiosPublic();
    const { user, loading, logOutUser } = useContext(AuthContext);
    const [userDataArray, setUserDataArray] = useState([]);
    const [userData] = userDataArray;

    const userMail = user?.email;
    const userRole = userData?.role;
    const userSubscription = userData?.subscription;
    const userName = userData?.name || user?.displayName;
    const userPhoto = userData?.photoUrl || user?.photoURL;

    useEffect(() => {
        axiosPublic.get(`/users/${userMail}`)
           .then(res => {
                setUserDataArray(res.data);
            })
           .catch(err => {
                console.log(err);
            })
    },[axiosPublic,userMail]);

    const globalLoggedInUser = {user, userMail, userName, userRole, userPhoto, userData, userSubscription, loading, logOutUser};

    return globalLoggedInUser ;
};

export default UseUserAuthInfo;