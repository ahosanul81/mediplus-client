import React from 'react';
import Dashboard from '../Pages/DashboardPage/Dashboard';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='flex gap-6'>
            <Dashboard></Dashboard>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default DashboardLayout;