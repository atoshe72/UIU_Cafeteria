import { useLoaderData } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from 'sweetalert2'

const AvailableOrders = () => {

    const {user, logOut, loading} = useContext(AuthContext)

    const handleAccept = async (orderId) => {
        const response = await fetch('http://localhost:5000/order/updateStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
                riderEmail: user.email,
                action: 'accept',
            }),
        });

        const result = await response.json();
        if (response.ok) {
            Swal.fire('Successful', result.message, 'success');
            location.reload();
        } else {
            Swal.fire('Error', result.error, 'error');
        }
    };

    const items = useLoaderData();
    const totalPrice = items.reduce((total, item) => total + (item.FoodQuantity * item.PricePerUnit), 0);
    return (
        <div className="np">
            <div className="overflow-x-auto">
            <h1 className="text-5xl font-bold text-center mb-16">All Available Orders</h1>
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Buyer&apos;s email</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price per item</th>
                            <th>Total price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items?.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.MyEmail}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.Image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.FoodName}</td>
                                <td>
                                    {item.FoodQuantity} 
                                </td> 
                                <td>
                                    {item.PricePerUnit}
                                </td>                 
                                <td>
                                    {item.FoodQuantity * item.PricePerUnit}
                                </td>              
                                <td>
                                    <button onClick={()=> handleAccept(item._id)} className="btn btn-success">Accept</button>
                                </td>               
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AvailableOrders;