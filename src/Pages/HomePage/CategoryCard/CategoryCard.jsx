import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { MediplusContext } from '../../../Context/MediplusProvider';
import useCategory from '../../../Hooks/useCategory';

const CategoryCard = () => {
    const [category] = useCategory()
    // const axiosPublic = useAxiosPublic()
    // const {setCategory} = useContext(MediplusContext)

    // const { data: category = [], refetch } = useQuery({
    //     queryKey: ['category'],
    //     queryFn: async () => {
    //         const { data } = await axiosPublic.get('/category')
    //         return data;
    //     }
    // })
    // console.log(category);


    return (
        <div className='grid grid-cols-3 gap-4'>
            {
                category.map(item =>
                    <Link key={item._id} to={`/categoryDetails/${item.name}`}>
                        <div className="card h-60 w-full ">
                            {/* style={{backgroundImage: `url(${item.image_url}) `}} */}
                            <img className='w-full h-full' src={item.image_url} alt="" />
                            <div className="card-body absolute flex items-center h-full w-full gap-4  bg-gradient-to-r from-[#000000dc] to-[#5a565637]">
                                <h2 className="card-header text-white text-4xl font-bold capitalize">{item.name}</h2>
                                <p className="text-content2 text-2xl text-amber-300 font-bold capitalize">Quantity: {item.medicine_count}</p>
                                <div className="card-footer">
                                    <button className="btn-secondary btn">Show All</button>
                                </div>
                            </div>
                        </div>
                    </Link>)
            }

        </div>

    );
};

export default CategoryCard;