import { useLoaderData } from "react-router-dom";

const PurchaseHistory = () => {
    const items = useLoaderData();
    return (
        <div className="np">
            <div className="overflow-x-auto">
            <h1 className="text-5xl font-bold text-center mb-16">Your Purchase Histories</h1>
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price per item</th>
                            <th>Total price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items?.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
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
                                    {item.status}
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

export default PurchaseHistory;