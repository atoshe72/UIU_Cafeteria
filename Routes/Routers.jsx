import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Foods from "../Pages/Foods/Foods";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import NotFound from "../Pages/Others/NotFound/NotFound";
import AllUser from "../Pages/Dashboad/Admin/AllUser";
import OrderHistory from "../Pages/Dashboad/Admin/OrderHistory";
import AddProduct from "../Pages/Dashboad/Farmer/AddProduct";
import MyProduct from "../Pages/Dashboad/Farmer/MyProduct";
import MyCart from "../Pages/Dashboad/User/MyCart";
import PurchaseHistory from "../Pages/Dashboad/User/PurchaseHistory";
import SellerRegister from "../Pages/Auth/Register/SellerRegister";
import RiderRegister from "../Pages/Auth/Register/RiderRegister";
import AvailableOrders from "../Pages/Dashboad/Rider/AvailableOrders";
import MyOrders from "../Pages/Dashboad/Rider/MyOrders";
import CompletedOrders from "../Pages/Dashboad/Rider/CompletedOrders";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
            loader: () =>  fetch("http://localhost:5000/users/sellers"),
        },
        {
          path: 'foods/:sellerEmail?',
          element: <Foods></Foods>,
          loader: ({ params }) => {
            const { sellerEmail } = params;
            const url = sellerEmail
              ? `http://localhost:5000/foods/${sellerEmail}`
              : `http://localhost:5000/foods`;
            return fetch(url);
          },
        },        
        {
          path: 'login',
          element: <Login></Login>,
        },
        {
            path: 'register',
            element: <Register></Register>,
          },
        {
            path: 'becomeSeller',
            element: <SellerRegister></SellerRegister>,
          },
        {
            path: 'becomeRider',
            element: <RiderRegister></RiderRegister>
          },
      ]
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: "allUser",
          element:  <PrivateRoute><AllUser></AllUser></PrivateRoute>,
          loader: () =>  fetch("http://localhost:5000/users"),
        },
        {
          path: 'orderHistory',
          element: <PrivateRoute><OrderHistory></OrderHistory></PrivateRoute>,
          loader: () =>  fetch("http://localhost:5000/orderHistory"),
        },
        {
          path: 'addProduct',
          element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>,
        },
        {
          path: 'myProduct/:email',
          element: <PrivateRoute><MyProduct></MyProduct></PrivateRoute>,
          loader: ({params}) =>  fetch(`http://localhost:5000/foods/my-foods/${params.email}`),
        },
        {
          path: 'myCart/:email',
          element: <PrivateRoute><MyCart></MyCart></PrivateRoute>,
          loader: ({params}) =>  fetch(`http://localhost:5000/MyCart/${params.email}`),
        },
        {
          path: 'purchaseHistory/:email',
          element: <PrivateRoute><PurchaseHistory></PurchaseHistory></PrivateRoute>,
          loader: ({params}) =>  fetch(`http://localhost:5000/MyPurchaseHistory/${params.email}`),
        },
        {
          path: 'availableProducts',
          element: <PrivateRoute> <AvailableOrders></AvailableOrders></PrivateRoute>,
          loader: ({params}) =>  fetch(`http://localhost:5000/pendingOrders`),
        },
        {
          path: 'acceptedProduct/:email',
          element: <PrivateRoute> <MyOrders></MyOrders> </PrivateRoute>,
          loader: ({params}) =>  fetch(`http://localhost:5000/acceptedOrders/${params.email}`),
        },
        {
          path: 'deliveredProduct/:email',
          element: <PrivateRoute> <CompletedOrders></CompletedOrders> </PrivateRoute>,
          loader: ({params}) =>  fetch(`http://localhost:5000/deliveredOrders/${params.email}`),
        },
      ]
    },
    {
      path: "*",
      element: <NotFound></NotFound>
    }
  ]);