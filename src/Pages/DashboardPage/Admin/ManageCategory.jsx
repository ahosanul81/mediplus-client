import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useManage from '../../../Hooks/useManage';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCategory from '../../../Hooks/useCategory';

const ManageCategory = () => {
    const axiosSecure = useAxiosSecure()
    const [category, refetch] = useCategory()

  
    // console.log(category);
    const handleDelete = async (id) => {
       
        try {
            const { data } = await axiosSecure.delete(`/category/${id}`);
            if (data.deletedCount > 0) {
                refetch()
                toast.success('Delete success', { autoClose: 500 });
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete item');
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category Name
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Product QTY
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
                            Update
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
                            Delete
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        category.map(item => <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 capitalize">
                                <img className='w-16 h-12 rounded-md' src={item.image_url} alt="" />
                            </th>
                            <td className="px-6 py-4 capitalize">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize">
                                {item.medicine_count}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize text-center text-xl  hover:text-amber-500">
                                <button><FaEdit/></button>
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize text-center text-xl hover:text-amber-500">
                                <button onClick={()=>handleDelete(item._id)}><FaTrashAlt/></button>
                            </td>
                            
                        </tr>)
                    }

                </tbody>
            </table>

            <div className='text-center mt-8'>
                <Link to="/dashboard/addCategory"><button className='btn bg-amber-800 text-white hover:text-black'>Add Category</button></Link>
            </div>
        </div>
    );
};

export default ManageCategory;