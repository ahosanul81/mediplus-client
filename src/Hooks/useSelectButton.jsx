import React, { useContext, useState } from 'react';
import { MediplusContext } from '../Context/MediplusProvider';
// import useAxiosPublic from './useAxiosPublic';
import useCart from './useCart';
import useAxiosSecure from './useAxiosSecure';
import toast from 'react-hot-toast';

const useSelectButton = () => {
    const {user} = useContext(MediplusContext)
    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = useCart()
    const [medicineDetails, setMedicineDetails] = useState(null)
    const [selectedItem, SetSelectedItem] = useState(null)
    const userEmail = user?.email;
    // console.log(userEmail);
    const handleSelect = async(id)=>{
      console.log(id);
        if (user && user.email) {
            const {data} = await axiosSecure.post(`/cart/${id}`, {userEmail})
            console.log(data);
            if(data.acknowledged){
                SetSelectedItem(id)
                toast.success('Added to cart')
                refetch()
            }
        }
    }
    return [handleSelect, medicineDetails, setMedicineDetails, selectedItem]
};

export default useSelectButton;