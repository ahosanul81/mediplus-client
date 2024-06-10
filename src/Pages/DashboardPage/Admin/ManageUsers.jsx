import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useManage from '../../../Hooks/useManage';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [, handleUpdateUserByAdmin] = useManage()

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            return data;
        }
    })
    console.log(users);


    // const handleUpdate = async(user)=> {
    //     console.log(user);
    //     const {data} = axiosSecure.update(`/users`)
    // }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-base text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            User Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Email
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Password
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
                            Update
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Delete
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(item => <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 capitalize">
                                <div className='flex items-center gap-2'>
                                    <img className='w-12 h-8 rounded-lg' src={item.imageUrl} alt="" />
                                    <h3>{item.name}</h3>
                                </div>
                            </th>
                            <td className="px-6 py-4 capitalize">
                                {item.email}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize">
                                {item.role}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {item.password}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize flex justify-center text-sm ">
                    
                                <form onSubmit={(e)=>handleUpdateUserByAdmin(e, item._id)} className=''>
                                    <select name="updateRole" id="updateRole" defaultValue={item.role}>
                                        <option value="user">User</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button type='submit' className='ml-2 text-xl hover:text-amber-500'> <FaEdit/></button>
                                </form>
                            </td>

                            <td className="px-6 py-4  capitalize text-center text-xl hover:text-amber-500">
                                <FaTrashAlt />
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;