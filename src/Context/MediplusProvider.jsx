import React, { createContext, useEffect, useState } from 'react';

import auth from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import useAxiosPublic from '../Hooks/useAxiosPublic';


export const MediplusContext = createContext(null)
const googleProvider = new GoogleAuthProvider();

const MediplusProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('')
    const axiosPublic = useAxiosPublic()
    // console.log(user);

    const SignUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUser = (name, imageUrl) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imageUrl
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            if (CurrentUser || !CurrentUser) {
                setUser(CurrentUser )
                console.log('current user', CurrentUser);
                setLoading(false)
                // jwt
                const userInfo = { email: CurrentUser?.email }

                axiosPublic.post('/jwt', userInfo, )
                    .then(res => {
                        // console.log(res.data.token);
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
            
            return () => unSubscribe()
        });

    }, [axiosPublic])

    const info = {
        SignUpUser,
        updateUser,
        user,
        loading,
        signInWithGoogle,
        signOutUser,
        category,
        setCategory,
        signInUser
    }
    return (

        <div>
            <MediplusContext.Provider value={info}>
                {children}
            </MediplusContext.Provider>
        </div>
    );
};

export default MediplusProvider;