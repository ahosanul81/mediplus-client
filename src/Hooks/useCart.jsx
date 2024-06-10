import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { MediplusContext } from '../Context/MediplusProvider';

const useCart = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(MediplusContext)
    const { data: cart = [], refetch } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/cart/${user?.email}`)
            return data;
        }
    })


    return [cart, refetch]
};

export default useCart;