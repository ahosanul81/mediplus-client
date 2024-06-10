import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MediplusContext } from '../../../Context/MediplusProvider';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(MediplusContext)

    const { data: paymentData =[] } = useQuery({
        queryKey: ['paymentHistory'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/paymentsHistory')
            return data;
        }
    })
    // console.log(paymentData);

    const sellerPostedMedicine = paymentData.map(item=> item.productDetails)
    console.log(sellerPostedMedicine);
    return (
        <div>
            <h1>payment historitu {paymentData.length}</h1>
        </div>
    );
};

export default PaymentHistory;