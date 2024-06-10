import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MediplusContext } from '../../../Context/MediplusProvider';

const PaymentHistoryUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(MediplusContext)

    const { data: paymentData = [] } = useQuery({
        queryKey: ['paymentHistoryUser'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments/${user?.email}`)
            return data;
        }
    })
    console.log(paymentData);
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            TraxID
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Paid Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        paymentData.map(item => <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 capitalize">
                                {item.userEmail}
                            </th>
                            <td className="px-6 py-4 capitalize">
                                {item.TraxID}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize">
                               $ {item.paidPrice}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {item.status}
                            </td>

                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistoryUsers;