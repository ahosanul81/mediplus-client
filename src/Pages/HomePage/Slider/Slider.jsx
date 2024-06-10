import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Slider = () => {
    const axiosSecure = useAxiosSecure()

    const { data: slideData =[] } = useQuery({
        queryKey: ['slide'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/slide')
            return data;
        }
    })
    // console.log(slideData);
    return (
        <>
            <div className='w-full h-96 flex items-center justify-center mb-24'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >

                    {
                        slideData.map(item => <SwiperSlide key={item._id}>
                            <img className='w-full h-96' src={item.imageUrl} alt="" />
                        </SwiperSlide>)
                    }



                </Swiper>
            </div>
        </>
    );
};

export default Slider;


// https://i.ibb.co/mBH9YKy/sitol.png
// https://i.ibb.co/vsCpfTk/sergel.jpg
// https://i.ibb.co/mCPHC9T/montela.jpg
// https://i.ibb.co/R09w2MB/napa-extra.jpg
// https://i.ibb.co/dcCDRWr/anema.jpg
// https://i.ibb.co/s15XCM4/hpc.jpg
// https://i.ibb.co/f22MrhK/abdolax.jpg