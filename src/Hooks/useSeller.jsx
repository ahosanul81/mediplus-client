import React, { useContext } from 'react';
import { MediplusContext } from '../Context/MediplusProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSeller = () => {
    const {user} = useContext(MediplusContext)
    const axiosSecure = useAxiosSecure()
    const {data: isAdmin} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/users/seller/${user?.email}`)
            return data;
        }
    })
    console.log(isAdmin);
    return isAdmin
};

export default useSeller;