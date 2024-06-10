import React, { useState } from 'react';

import { FaEye } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';

const CategoryDetails = () => {
    const [medicineDetails, setMedicineDetails] = useState({})
    const categoryData = useLoaderData()
    console.log(categoryData);



    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Medicine Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Generic Name
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Company
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Mass Unit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Per Unit Price
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Select
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Details
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categoryData?.map(item => <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 capitalize">
                                {item.itemName}
                            </th>
                            <td className="px-6 py-4 capitalize">
                                {item.itemGenericName}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize">
                                {item.category}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {item.company}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 capitalize">
                                {item.itemMassUnit}
                            </td>
                            <td className="px-6 py-4  capitalize">
                                {item.perUnitPrice}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                <button className='py-1 px-3 rounded-md bg-amber-800 text-white'>Select</button>
                            </td>
                            <td className="px-6 py-4">
                                {/* You can open the modal using document.getElementById('ID').showModal() method */}

                                <div onClick={() => document.getElementById('my_modal_4').showModal()}>
                                    <button onClick={() => setMedicineDetails(item)} className='text-2xl text-center  hover:text-amber-500'><FaEye /></button>
                                </div>
                                {
                                    medicineDetails && <dialog id="my_modal_4" className="modal">
                                        <div className="modal-box w-11/12 max-w-5xl">
                                            <div className='flex items-center px-20'>
                                                <div className='w-1/2'>
                                                    <img src={medicineDetails.imageUrl} alt="" />
                                                </div>
                                                <div className='w-1/2 space-y-5'>
                                                    <div>
                                                        <h1 className='text-3xl text-black font-bold capitalize'>{medicineDetails.itemName}</h1>
                                                        <h5 className='text-xl'>{medicineDetails.itemGenericName}</h5>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <h3>{medicineDetails.category}</h3>
                                                        <h3>Mass Unit: {medicineDetails.itemMassUnit}</h3>
                                                        <h3 className=''>{medicineDetails.company}</h3>
                                                    </div>

                                                    <div>
                                                        <p><span className='font-bold text-black'>Description: </span>{medicineDetails.shortDescription}</p>
                                                    </div>
                                                    <div className=''>
                                                        <h1 className='text-2xl font-bold border-2 border-orange-500 rounded-md p-1 text-center'>$ {medicineDetails.perUnitPrice}</h1>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button, it will close the modal */}
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                }


                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default CategoryDetails;