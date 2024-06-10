import React, { useContext } from 'react';
import useSocialLogin from '../../Hooks/useSocialLogin';
import { MediplusContext } from '../../Context/MediplusProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [handleSignInWithGoogle] = useSocialLogin()
    const { signInUser } = useContext(MediplusContext)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signInUser(email, password)
            .then(result => {
                console.log(result.user);

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Logged in Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state.from.pathname ? location?.state.from.pathname : '/')
            })
    }
    return (
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800 mb-24 mx-auto">
            <h1 className="text-2xl font-bold text-center">Sign In</h1>
            <form onSubmit={handleLogin} noValidate className="space-y-6">

                <div className="space-y-1 text-sm">
                    <label className="block text-gray-600">Email</label>
                    <input type="email" name="email" id="email" placeholder="john@gmail.com" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600" />
                </div>

                <div className="space-y-1 text-sm">
                    <label htmlFor="password" className="block text-gray-600">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600" />
                    <div className="flex justify-end text-xs text-gray-600">
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
                <button className="btn  w-full p-3 text-center rounded-sm text-gray-50 bg-teal-600 hover:bg-teal-800">Sign In</button>
            </form>
            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={() => handleSignInWithGoogle()} aria-label="Log in with Google" className="p-3 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                </button>
                <button aria-label="Log in with Twitter" className="p-3 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                    </svg>
                </button>
                <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.147-5.391-2.147-0.729-1.865-1.781-2.359-1.781-2.359-1.458-0.99 0.11-0.969 0.11-0.969 1.615 0.12 2.465 1.667 2.465 1.667 1.437 2.459 3.771 1.75 4.688 1.338 0.146-1.042 0.562-1.751 1.021-2.156-3.553-0.405-7.288-1.771-7.288-7.887 0-1.741 0.615-3.167 1.624-4.285-0.161-0.406-0.703-2.042 0.155-4.255 0 0 1.328-0.427 4.343 1.635 1.261-0.349 2.615-0.521 3.962-0.531 1.347 0.01 2.703 0.182 3.969 0.531 3.01-2.062 4.333-1.635 4.333-1.635 0.865 2.213 0.323 3.849 0.161 4.255 1.01 1.119 1.615 2.547 1.615 4.285 0 6.13-3.74 7.473-7.305 7.865 0.573 0.495 1.088 1.5 1.088 3.021 0 2.181-0.021 3.938-0.021 4.469 0 0.427 0.281 0.927 1.104 0.771 6.344-2.12 10.917-8.11 10.917-15.183 0-8.833-7.161-16-16-16z"></path>
                    </svg>
                </button>
            </div>
            <p className="text-xs text-center sm:px-6 text-gray-600">Already have an account?
                <a href="#" className="underline text-gray-800">Sign in</a>
            </p>

        </div>
    );
};

export default SignIn;