import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEye } from 'react-icons/fa';
import MedicineTable from '../../../Component/MedicineTable/MedicineTable';

const PaymentManagement = () => {
    const axiosSecure = useAxiosSecure()
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['paymentManagement'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/payments')
            return data
        }
    })

    const handleAccept = async (id) => {
        const { data } = await axiosSecure.patch(`/payments/${id}`)
        // console.log(data);
        if(data.modifiedCount > 0){
            refetch()
        }
    }

    console.log(payments);
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Customer name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Total Paid Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            TrxID
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Method
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Update Status
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        payments.map(item => <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 capitalize">
                                {item.name}
                            </th>
                            <td className="px-6 py-4 capitalize">
                                {item.userEmail}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize">
                                $ {item.paidPrice}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {item.TraxID}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize">
                                {item.paymentMethod}
                            </td>
                            <td className="px-6 py-4  capitalize">
                                {item.date}
                            </td>
                            <td className="px-6 py-4  capitalize">
                                <button className='bg-green-700 p-2 rounded-md text-white'>{item.status}</button>
                            </td>
                            <td className="px-6 py-4  capitalize">
                                <button onClick={() => handleAccept(item._id)} className='bg-amber-700 p-2 rounded-md text-white'>Accept</button>
                            </td>


                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default PaymentManagement;