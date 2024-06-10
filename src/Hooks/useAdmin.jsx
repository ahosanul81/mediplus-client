import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { MediplusContext } from '../Context/MediplusProvider';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user} = useContext(MediplusContext)
    const axiosSecure = useAxiosSecure()
    const {data: isAdmin} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/users/admin/${user?.email}`)
            return data;
        }
    })
    console.log(isAdmin);
    return isAdmin
};

export default useAdmin;