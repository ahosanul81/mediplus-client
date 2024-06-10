import React from 'react';
import useCart from '../../Hooks/useCart';
import useSelectButton from '../../Hooks/useSelectButton';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import useManage from '../../Hooks/useManage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart] = useCart()
    const [handleDeleteCart] = useManage()
    const [, medicineDetails, setMedicineDetails] = useSelectButton()
    // console.log(cart);

    const totalPrice = cart.reduce((acc, curr) => acc + parseInt(curr.perUnitPrice), 0)



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
                        <th scope="col" className="px-6 py-3 text-right">
                            Per Unit Price
                        </th>
                        {/* <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Select
                        </th> */}
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Details
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map(item => <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">

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
                            <td className="px-6 py-4  capitalize text-right">
                                $ {item.perUnitPrice}
                            </td>
                            {/* <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                <button onClick={() => handleSelect(item._id)} className='py-1 px-3 rounded-md bg-amber-800 text-white'>Select</button>
                            </td> */}
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
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
                            <td className='px-6 py-4 flex justify-center text-xl hover:text-amber-500'>
                                <button onClick={() => handleDeleteCart(item._id)}><FaTrashAlt /></button>
                            </td>
                        </tr>)
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Total Price = $ {totalPrice}</th>
                    </tr>
                </tfoot>
            </table>
            <div className='text-center'>
                <Link to="/payment"><button className='btn bg-orange-500 text-white'>PAY ${totalPrice}</button></Link>
            </div>
        </div>
    );
};

export default Cart;