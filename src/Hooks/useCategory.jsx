import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
    const axiosPublic = useAxiosPublic()


    const { data: category = [], refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/category')
            return data;
        }
    })

    return [category, refetch]
};

export default useCategory;