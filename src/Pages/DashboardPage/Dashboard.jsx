import React, { useState } from 'react';
import { FaDotCircle, FaHome } from 'react-icons/fa';
import { GoDotFill } from "react-icons/go";
import { MdManageAccounts, MdManageHistory, MdPayment } from 'react-icons/md';
import { RiAdvertisementFill } from 'react-icons/ri';
import { TbReportSearch } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
// import useAdmin from '../../Hooks/useAdmin';
import useRole from '../../Hooks/useRole';

const Dashboard = () => {
    // const isAdmin = useAdmin()
    const [admin, seller, Guser] = useRole()
    const [isActive, setActive] = useState('')
    console.log('role', admin, seller, Guser);

    return (
        <div className='flex flex-col justify-between w-1/4 min-h-screen bg-green-900 text-white text-base pl-5 pt-5' >
            {
                admin && <ul className='space-y-4 '>
                    <li><NavLink onClick={() => setActive('adminHome')} to="/dashboard/adminHome" className={"flex items-center gap-2"}> <FaHome /> Admin homepage {isActive === 'adminHome' ? <GoDotFill className='mt-1' /> : ''} </NavLink></li>
                    <li><NavLink onClick={() => setActive('manageUsers')} to="/dashboard/manageUsers" className={"flex items-center gap-2"}><MdManageAccounts /> Manage Users {isActive === 'manageUsers' ? <GoDotFill className='mt-1' /> : ''}</NavLink></li>
                    <li><NavLink onClick={() => setActive('paymentManagement')} to="/dashboard/paymentManagement" className={"flex items-center gap-2"}><MdPayment /> Payment Management {isActive === 'paymentManagement' ? <GoDotFill className='mt-1' /> : ''}</NavLink></li>
                    <li><NavLink onClick={() => setActive('salesReport')} to="/dashboard/salesReport" className={"flex items-center gap-2"}><TbReportSearch /> Sales Report {isActive === 'salesReport' ? <GoDotFill className='mt-1' /> : ''}</NavLink></li>
                    <li><NavLink onClick={() => setActive('manageCategory')} to="/dashboard/manageCategory" className={"flex items-center gap-2"}><MdManageHistory /> Manage Category {isActive === 'manageCategory' ? <GoDotFill className='mt-1' /> : ''}</NavLink></li>
                    <li><NavLink onClick={() => setActive('manageSlider')} to="/dashboard/manageSlider" className={"flex items-center gap-2"}><RiAdvertisementFill /> Manage Slider Advertise {isActive === 'manageSlider' ? <GoDotFill className='mt-1' /> : ''}</NavLink></li>
                </ul>
            }

            {
                seller && <ul className='space-y-4 '>
                    <li><NavLink onClick={() => setActive('sellerHome')} to="/dashboard/sellerHome" className={"flex items-center gap-2"}> <FaHome /> Seller homepage {isActive === 'sellerHome' ? <GoDotFill className='mt-1' /> : ''} </NavLink></li>
                    <li><NavLink onClick={() => setActive('manageMedicine')} to="/dashboard/manageMedicine" className={"flex items-center gap-2"}><MdManageAccounts /> Manage Medicines {isActive === 'manageMedicine' ? <GoDotFill className='mt-1' /> : ''}</NavLink></li>
                    <li><NavLink onClick={() => setActive('paymentHistory')} to="/dashboard/paymentHistory" className={"flex items-center gap-2"}><MdPayment /> Payment History {isActive === 'paymentHistory' ? <GoDotFill className='mt-1' /> : ''}</NavLink></li>
                    <li><NavLink onClick={() => setActive('askForAd')} to="/dashboard/askForAd" className={"flex items-center gap-2"}><TbReportSearch /> Ask For Ad {isActive === 'askForAd' ? <GoDotFill className='mt-1' /> : ''}</NavLink></li>

                </ul>
            }

            {
                Guser && <ul className='space-y-4 '>
                    

                    <li><NavLink onClick={() => setActive('paymentHistoryUser')} to="/dashboard/paymentHistoryUser" className={"flex items-center gap-2"}> <FaHome /> Payment History {isActive === 'paymentHistoryUser' ? <GoDotFill className='mt-1' /> : ''} </NavLink></li>
                    <li><NavLink onClick={() => setActive('myQueries')} to="/dashboard/myQueries" className={"flex items-center gap-2"}><MdManageAccounts /> My Queries {isActive === 'myQueries' ? <GoDotFill className='mt-1' /> : ''}</NavLink></li>


                </ul>
            }


            <ul>
                <li><NavLink to="/" className={"flex items-center gap-2"}><FaHome /> Home</NavLink></li>
            </ul>
        </div>
    );
};

export default Dashboard;