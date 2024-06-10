import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MediplusProvider from './Context/MediplusProvider.jsx';
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './Pages/HomePage/Home/Home.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/signIn',
        element: <SignIn></SignIn>
      },
      {
        path: '/shop',
        element: <Shop></Shop>
      },
      {
        path: '/categoryDetails/:name',
        element: <CategoryDetails></CategoryDetails>,
        loader: ({ params }) => fetch(`https://mediplus-server.vercel.app/shop/category/${params.name}`)
      },
      {
        path: '/cart',
        element: <PrivateRoute><Cart></Cart></PrivateRoute>
      },
      {
        path: '/payment',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },
    ]
  },

  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children:[
      // admin
      {
        path: "adminHome",
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: "manageUsers",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "manageCategory",
        element: <AdminRoute><ManageCategory></ManageCategory></AdminRoute>
      },
      {
        path: "paymentManagement",
        element: <AdminRoute><PaymentManagement></PaymentManagement></AdminRoute>
      },
      {
        path: "salesReport",
        element: <AdminRoute><SalesReport></SalesReport></AdminRoute>
      },
      {
        path: "manageSlider",
        element: <AdminRoute><SlideManage></SlideManage></AdminRoute>
      },
      {
        path: "addCategory",
        element: <AdminRoute><AddCategory></AddCategory></AdminRoute>
      },

      // seller 
      {
        path: "sellerHome",
        element: <SellerRoute><SellerHome></SellerHome></SellerRoute>
      },
      {
        path: "manageMedicine",
        element: <SellerRoute><ManageMedicine></ManageMedicine></SellerRoute>
      },
      {
        path: "paymentHistory",
        element: <SellerRoute><PaymentHistory></PaymentHistory></SellerRoute>
      },
      {
        path: "askForAd",
        element: <SellerRoute><AskForAd></AskForAd></SellerRoute>
      },

      // user
      {
        path: "paymentHistoryUser",
        element: <PrivateRoute><PaymentHistoryUsers></PaymentHistoryUsers></PrivateRoute>
      },
      {
        path: "myQueries",
        element: <PrivateRoute><MyQueries></MyQueries></PrivateRoute>
      }
    ]
  }
]);

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import SignIn from './Pages/SignIn/SignIn.jsx';
import Shop from './Pages/ShopPage/Shop.jsx';
import CategoryDetails from './Pages/CategoryDetails/CategoryDetails.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import DashboardLayout from './Layouts/DashboardLayout.jsx';
import AdminHome from './Pages/DashboardPage/Admin/AdminHome.jsx';
import ManageUsers from './Pages/DashboardPage/Admin/ManageUsers.jsx';
import ManageCategory from './Pages/DashboardPage/Admin/ManageCategory.jsx';
import PaymentManagement from './Pages/DashboardPage/Admin/PaymentManagement.jsx';
import SalesReport from './Pages/DashboardPage/Admin/SalesReport.jsx';
import SlideManage from './Pages/DashboardPage/Admin/SlideManage.jsx';
import AddCategory from './Pages/DashboardPage/Admin/AddCategory.jsx';
import Payment from './Pages/PaymentPage/Payment.jsx';
import SellerHome from './Pages/DashboardPage/Seller/SellerHome.jsx';
import ManageMedicine from './Pages/DashboardPage/Seller/ManageMedicine.jsx';
import PaymentHistory from './Pages/DashboardPage/Seller/PaymentHistory.jsx';
import AskForAd from './Pages/DashboardPage/Seller/AskForAd.jsx';
import { Toaster } from 'react-hot-toast';
import AdminRoute from './Routes/AdminRoute.jsx';
import SellerRoute from './Routes/SellerRoute.jsx';
import MyQueries from './Pages/DashboardPage/User/MyQueries.jsx';
import PaymentHistoryUsers from './Pages/DashboardPage/User/PaymentHistoryUsers.jsx';

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MediplusProvider>
        <RouterProvider router={router} />
      </MediplusProvider>
    </QueryClientProvider>
    <Toaster />
  </React.StrictMode>,

)
