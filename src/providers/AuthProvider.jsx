import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import auth from "../firebase/firebase.config";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import UseAxiosPublic from "../hooks/UseAxiosPublic";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = UseAxiosPublic();

    // Sign Up user with password
    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update Profile Name and Photo
    const updateUserName = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    };

    const updatePhoto = (photo) => {
        return updateProfile(auth.currentUser, {
            photoURL: photo
        });
    };

    // sign in a user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign In
    const googleProvider = new GoogleAuthProvider();
    // Creating Google Provider for sign in
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    //LogOut user
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Observing user
    //observing logged in user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (loggedInUser) => {
            console.log("observing", loggedInUser);
            setUser(loggedInUser);
            setLoading(false);
            const userEmail = loggedInUser?.email || user?.email;
            const loggedInUserEmail = {email: userEmail};
            // issue a token if user exists
            if(loggedInUser){
                axiosPublic.post("/jwt", loggedInUserEmail, {withCredentials: true})
                    .then(res => console.log("Token Response",res.data));
            }
            else{
                axiosPublic.post("/logout", loggedInUserEmail, {withCredentials: true}).then(res => console.log("Token Response",res.data));
            }
        });
        return () => {
            unSubscribe();
        };
    }, [user,axiosPublic]);


    const authInfo = { user, loading, signUpUser, updateUserName, updatePhoto, signInUser, logOutUser, googleSignIn };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;