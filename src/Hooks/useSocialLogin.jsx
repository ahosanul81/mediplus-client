import React, { useContext } from 'react';
import { MediplusContext } from '../Context/MediplusProvider';

const useSocialLogin = () => {
    const {signInWithGoogle} = useContext(MediplusContext)

    const handleSignInWithGoogle = ()=>{
        signInWithGoogle()
        .then(result=>{
            console.log(result.user);
        })
        .catch(error=>{
            console.log(error.message);
        })
    }
    return [handleSignInWithGoogle];
};

export default useSocialLogin;



