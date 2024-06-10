import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useCategory from '../../../Hooks/useCategory';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [, refetch] = useCategory()
    const navigate = useNavigate()

    const handleCategory = (e)=>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const qty = form.qty.value;
        // console.log(name, image, qty);

        const apiKey = 'd4473e57f7c87e933d3fe8538ea86a57'
        const formData = new FormData()
        formData.append('key', apiKey)
        formData.append('image', image)

        // send data to imgbb
        axiosPublic.post('https://api.imgbb.com/1/upload', formData)
        .then(res=>{
            // console.log(res.data);
            const categoryInfo = {
                name: name,
                image_url: res.data.data.display_url,
                medicine_count: qty
            }

            if(res.data.success){
                axiosSecure.post('/category', {categoryInfo})
                .then(res=> {
                    console.log('Category added', res);
                    // toast.success('Category added')
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Category added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/dashboard/manageCategory")
                    
                })
                .catch(error=>{
                    console.log(error.message);
                })
            }
        })
        .catch(error=>{
            console.log(error.message);
        })
    }

    return (
        <div className='w-full mt-12'>

            <h1 className='text-4xl font-bold text-center'>Add Category</h1>
            <form  onSubmit={handleCategory}>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm">Category Name </label>
                    <input type="name" name="name" id="name" placeholder="Tablet " className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                </div>

                <div>
                    <label htmlFor="image" className="block mb-2 text-sm">Category Image address</label>
                    <input type="file" name="image" id="image" placeholder="" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                </div>

                <div>
                    <label htmlFor="qty" className="block mb-2 text-sm">Product Qty</label>
                    <input type="number" name="qty" id="qty" placeholder="100" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                </div>

                <div className='text-center mt-8'>
                    <button type='submit' className='btn bg-amber-800 text-white'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;