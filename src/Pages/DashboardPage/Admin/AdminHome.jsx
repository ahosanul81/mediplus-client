
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaDollarSign } from 'react-icons/fa';
import { TiTick } from "react-icons/ti";
import { MdPending } from 'react-icons/md';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure()

    const { data: adminStat = [] } = useQuery({
        queryKey: ['adminState'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/adminStat')
            return data;
        }
    })
    console.log(adminStat);

    return (
        <div>
            <section className="p-6 my-6 bg-gray-100 text-gray-800 w-full">
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3">
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800 w-full">
                        <div className="flex justify-center items-center text-white text-4xl p-2 align-middle rounded-lg sm:p-4 bg-teal-600">

                            <FaDollarSign />

                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="capitalize">Total Revenue</p>
                            <p className="text-3xl font-semibold leading-none">$ {adminStat.totalRevenue}</p>

                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800">
                        <div className="flex justify-center items-center text-white text-4xl p-2 align-middle rounded-lg sm:p-4 bg-teal-600">
                            <TiTick />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="capitalize">Paid Total</p>
                            <p className="text-3xl font-semibold leading-none">$ {adminStat.paidTotal}</p>

                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800">
                        <div className="flex justify-center items-center text-white text-4xl p-2 align-middle rounded-lg sm:p-4 bg-teal-600">
                        <MdPending />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="capitalize">Pending Total</p>
                            <p className="text-3xl font-semibold leading-none">$ {adminStat.pendingTotal}</p>

                        </div>
                    </div>
                  
                </div>
            </section>
        </div>
    );
};

export default AdminHome;