import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MediplusContext } from '../../../Context/MediplusProvider';
import { TfiAlignLeft, TfiAngleDown } from 'react-icons/tfi';
import { FaCartPlus, FaPercent, FaSearch } from 'react-icons/fa';
import useCart from '../../../Hooks/useCart';
import toast from 'react-hot-toast';


const Navbar = () => {
    const { user, signOutUser } = useContext(MediplusContext)
    const [cart] = useCart()
    const navigate = useNavigate()
    const navlinks = <>
        <li><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending " : isActive ? " border-t-2 border-t-orange-500 " : "text-black hover:text-amber-700 hover:font-semibold "}>Home</NavLink></li>
        <li><NavLink to="/shop" className={({ isActive, isPending }) => isPending ? "pending " : isActive ? " border-t-2 border-t-orange-500 " : "text-black hover:text-amber-700 hover:font-semibold "}>Shop</NavLink></li>
        <li><NavLink to="/cart" className={({ isActive, isPending }) => isPending ? "pending " : isActive ? "  flex items-center gap-1 text-[1rem] bg-orange-700 text-white p-2 rounded-3xl" : " flex items-center gap-1 text-[1rem] bg-orange-700 text-white p-2 rounded-3xl"}><FaCartPlus/> Cart ({cart.length})</NavLink></li>
        <li><NavLink to="/language" className={({ isActive, isPending }) => isPending ? "pending " : isActive ? " border-t-2 border-t-orange-500 " : "text-black hover:text-amber-700 hover:font-semibold "}>Languages</NavLink></li>
        <li><NavLink to="/dashboard" className={({ isActive, isPending }) => isPending ? "pending " : isActive ? " border-t-2 border-t-orange-500 " : "text-black hover:text-amber-700 hover:font-semibold "}>Dashboard</NavLink></li>
    </>

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('Sign-out successful');
                toast.success('successfully Sign Out ', {autoClose: 1200})
                navigate('/')
            })
    }

    return (
        <div>
            {/* part1 */}
            <div className=' flex justify-between items-center'>
                <div className='w-1/5'>
                    <div className='w-14 h-14 '>
                        <img className='w-full h-full' src="https://i.ibb.co/wydHy2T/images.jpg" alt="" />
                    </div>
                </div>
                <div className='w-3/5'>
                    <ul className='list-none flex items-center gap-10'>
                        {navlinks}
                    </ul>
                </div>
                <div className="w-1/5">
                    <div className="w-full flex justify-end items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">

                        {
                            user ? <>
                                <div >
                                    <div className="dropdown dropdown-end z-30">
                                        <div tabIndex={0} >
                                            <div title={user?.email} className='w-14 h-14 rounded-full border border-green-500 p-1 flex'>
                                                <img className='w-full h-full rounded-full' src={user?.photoURL} alt="" />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><Link>Update Profile</Link></li>
                                            <li><Link>Dashboard</Link></li>
                                            <li> <button onClick={handleSignOut} className='bg-dark bg-green-600 dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-1 px-5 text-center  font-medium text-white hover:text-black text-sm hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'>
                                                Sign Out
                                            </button></li>
                                        </ul>
                                    </div>
                                </div>



                            </> :
                                <>
                                    <Link to="/signIn">
                                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white"> Sign in</button>
                                    </Link>

                                    <Link to="/signUp">
                                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500">Sign up</button>
                                    </Link>
                                </>
                        }


                        <div className="md:hidden">
                            <button type="button" className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                                <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* part 2 */}

            <div className='flex items-center justify-between bg-[#1b7069] h-16'>
                <div className='bg-orange-400 w-1/5 h-10 flex items-center'>
                    <h1 className='flex items-center gap-5 text-xl'><TfiAlignLeft /> All Categories <TfiAngleDown /></h1>
                </div>

                <div className='w-3/5 '>
                    <fieldset className="w-full h-full space-y-1 text-gray-800">

                        <div className="flex">
                            <input type="text" name="url" id="url" placeholder="Search" className="flex flex-1 py-2 px-5  border sm:text-sm  focus:ring-inset border-gray-300 text-gray-800 bg-gray-100 focus:ring-teal-600" />
                            <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-r-md  bg-orange-500"><FaSearch /></span>
                        </div>
                    </fieldset>
                </div>
                <div className='w-1/5  flex justify-end'>
                    <div>
                        <h1 className='flex items-center gap-4 text-white text-2xl'>Specials offers <FaPercent /> </h1>
                    </div>

                </div>
            </div>
     
        </div>
    );
};

export default Navbar;