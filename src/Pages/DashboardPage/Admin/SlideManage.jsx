import React, { useContext } from 'react';
import { MediplusContext } from '../../../Context/MediplusProvider';
import useClodinaryImg from '../../../Hooks/useClodinaryImg';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const SlideManage = () => {
    const { user } = useContext(MediplusContext)
    const axiosSecure = useAxiosSecure()
    const [handleImage] = useClodinaryImg()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const sellerName = form.sellerName.value;
        const sellerEmail = form.sellerEmail.value;
        const slideNo = form.slideNo.value;
        const image = form.image.files[0];


        console.log(sellerName, sellerEmail, slideNo);

        try {
            const imageUrl = await handleImage(image)

            const slideInfo = {
                slideNo: slideNo,
                sellerName, sellerEmail,
                imageUrl: imageUrl
            }
            const { data } = await axiosSecure.post('/slide', { slideInfo })
            console.log(data);
            if (data.acknowledged) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Successfully Signed Up",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error.message);
        }



    }
    return (
        <div>
            <div className='text-center mt-8 text-center'>
                <button className="btn bg-amber-500 text-white " onClick={() => document.getElementById('my_modal_4').showModal()}>Add Slide</button>
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
                                    <label htmlFor="slideNo" className="text-sm">Slide No.</label>
                                    <input name='slideNo' id="slideNo" type="number" placeholder="" className="w-full rounded-md border border-slate-500 p-1" />
                                </div>

                                <fieldset className="w-full space-y-1 text-gray-800">
                                    <label htmlFor="files" className="block text-sm font-medium">Image </label>
                                    <div className="flex">
                                        <input type="file" name="image" id="files" className="px-8 py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100" />
                                    </div>
                                </fieldset>

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

export default SlideManage;