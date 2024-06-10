import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useCart from './useCart';
import toast from 'react-hot-toast';


const useManage = () => {
    const [, refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    const handleDeleteCart = async (id) => {
        const { data } = await axiosSecure.delete(`/cart/${id}`)
        // console.log(data);
        if (data.deletedCount > 0) {
            refetch()
            toast.success('Delete success')
        }
    }

    const handleUpdateUserByAdmin = async (e, id) => {
        const updatedRole = e.target.updateRole.value;
        console.log(updatedRole);
        console.log(id);
        const { data } = await axiosSecure.patch(`/users/${id}`, { updatedRole })
        console.log('user data', data);
    }
    // const handleDelete = async (url, id) => {
    //     const { data } = await axiosSecure.delete(`${url}/${id}`)
    //     // console.log(data);
    //     if (data.deletedCount > 0) 
    //         toast.success('Delete success', { autoClose: 500 })
    //     }
    // }

   
   


    return [handleDeleteCart, handleUpdateUserByAdmin]
};



export default useManage;