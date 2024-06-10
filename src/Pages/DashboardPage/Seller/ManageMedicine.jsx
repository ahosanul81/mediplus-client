import React, { useContext } from 'react';
import MedicineTable from '../../../Component/MedicineTable/MedicineTable';
import { FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MediplusContext } from '../../../Context/MediplusProvider';
import useImgBB from '../../../Hooks/useImgBB';
import useClodinaryImg from '../../../Hooks/useClodinaryImg';
import toast from 'react-hot-toast';

const ManageMedicine = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(MediplusContext)
    const [handleImage] = useClodinaryImg()
    // const [handleImgBB] = useImgBB()
    // const [handleImage] = useClodinaryImg()

    const { data: sellerData = [] } = useQuery({
        queryKey: ['shop'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/shop/${user?.email}`,)
            return data;
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const sellerName = form.sellerName.value;
        const sellerEmail = form.sellerEmail.value;
        const itemName = form.itemName.value;
        const itemGenericName = form.itemGenericName.value;
        const category = form.category.value;
        const itemMassUnit = form.itemMassUnit.value;
        const perUnitPrice = form.perUnitPrice.value;
        const company = form.company.value;
        const discountPercentage = form.discountPercentage.value;
        const image = form.image.files[0];
        const shortDescription = form.shortDescription.value;
        // handleImgBB(image)
        // setImage(image)
        console.log(sellerName, sellerEmail, itemName, itemGenericName, category, itemMassUnit, perUnitPrice, company, discountPercentage, shortDescription);

        try {
            const imageUrl = await handleImage(image)

            const medicineInfo = {
                sellerName, sellerEmail, itemName, itemGenericName, category, itemMassUnit, perUnitPrice,imageUrl, company, discountPercentage, shortDescription
            }

            const { data } = await axiosSecure.post('/shop', {medicineInfo})
            // console.log(data);
            if(data.acknowledged){
                toast.success('Medicine added successful')
            }

        } catch (error) {
            console.log(error.message);
        }


    }


    return (
        <div>
            <MedicineTable th1={'Medicine name'} th2={'GENERIC NAME'} th3={'CATEGORY'} th4={'COMPANY'} th5={'MASS UNIT'} th6={'PER UNIT PRICE'} th7={'Select'} th8={'details'}
                data={sellerData} detailsIcon={<FaEye></FaEye>}
            ></MedicineTable>


            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <div className='text-center mt-8'>
                <button className="btn bg-amber-500 text-white " onClick={() => document.getElementById('my_modal_4').showModal()}>Add Medicine</button>
            </div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div>
                        <form onSubmit={handleSubmit} action="">
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="sellerName" className="text-sm">Seller Name</label>
                                    <input defaultValue={user?.displayName} readOnly name='sellerName' id="sellerName" type="text" placeholder="Mr. Rahim" className="w-full rounded-md border border-slate-500 p-1 text-gray-500" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="sellerEmail" className="text-sm">Seller Email</label>
                                    <input defaultValue={user?.email} readOnly name='sellerEmail' id="sellerEmail" type="email" placeholder="example@gmail.com" className="w-full rounded-md border border-slate-500 p-1 text-gray-500" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="itemName" className="text-sm">Medicine Name</label>
                                    <input name='itemName' id="itemName" type="text" placeholder="Medicine name" className="w-full rounded-md border border-slate-500 p-1" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="itemGenericName" className="text-sm">Generic Name</label>
                                    <input name='itemGenericName' id="itemGenericName" type="text" placeholder="generic Name" className="w-full rounded-md border border-slate-500 p-1" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="category" className="text-sm">Category name</label>
                                    {/* <input name='category' id="category" type="text" placeholder="Category" className="w-full rounded-md border border-slate-500 p-1"/> */}
                                    <select name="category" id="category" className='w-full rounded-md border border-slate-500 p-1'>
                                        <option value="tablet">Tablet</option>
                                        <option value="injection">Injection</option>
                                        <option value="syrup">Syrup</option>
                                        <option value="capsule">Capsule</option>
                                        <option value="saline">Saline</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="itemMassUnit" className="text-sm">Unit</label>
                                    {/* <input name='itemMassUnit' id="itemMassUnit" type="text" placeholder="Mg/ul " className="w-full rounded-md border border-slate-500 p-1" /> */}
                                    <select name="itemMassUnit" id="itemMassUnit" className='w-full rounded-md border border-slate-500 p-1'>
                                        <option value="mg">Mg</option>
                                        <option value="ml">ML</option>
                                        <option value="ul">Ul</option>
                                    </select>
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="perUnitPrice" className="text-sm">Per unit Price</label>
                                    <input name='perUnitPrice' id="perUnitPrice" type="number" placeholder="Price" className="w-full rounded-md border border-slate-500 p-1" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="company" className="text-sm">Company</label>
                                    <input name='company' id="company" type="text" placeholder="ABC pharmaciticals LTD." className="w-full rounded-md border border-slate-500 p-1" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="discountPercentage" className="text-sm">Discount</label>
                                    <input defaultValue={0} name='discountPercentage' id="discountPercentage" type="number" placeholder="Discount" className="w-full rounded-md border border-slate-500 p-1" />
                                </div>
                                <fieldset className="w-full space-y-1 text-gray-800">
                                    <label htmlFor="files" className="block text-sm font-medium">Image </label>
                                    <div className="flex">
                                        <input type="file" name="image" id="files" className="px-8 py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100" />
                                    </div>
                                </fieldset>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="shortDescription" className="text-sm">Description</label>

                                    <textarea name="shortDescription" id="shortDescription" className='w-full rounded-md border border-slate-500'></textarea>
                                </div>
                            </div>

                            <div className='text-center mt-8'>
                                <button className='btn bg-amber-600 text-white'>Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageMedicine;