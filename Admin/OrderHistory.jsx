import { useLoaderData } from "react-router-dom";

const OrderHistory = () => {
    const items = useLoaderData();
    const totalPrice = items.reduce((total, item) => total + (item.FoodQuantity * item.PricePerUnit), 0);
    return (
        <div className="np">
            <div className="overflow-x-auto">
            <h1 className="text-5xl font-bold text-center mb-16">All Purchase Histories Till Now</h1>
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
                            <th>Rider Email</th>
                            <th>Status</th>
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
                                    {item.RiderEmail}
                                </td>               
                                <td>
                                    {item.status}
                                </td>               
                            </tr>
                            )
                        }
                        <td></td>
                        <th colSpan="5" className="text-right">Total Order Value</th>
                        <td>{totalPrice}</td>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;