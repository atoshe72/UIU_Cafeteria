import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'

const MyCart = () => {
    const items = useLoaderData();

    const handleReduceOne = (item) => {
        if (item.FoodQuantity > 1) {
            updateItemQuantity(item._id, item.FoodQuantity - 1);
        }
        else{
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Can not reduce to zero!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleAddOne = (item) => {
        updateItemQuantity(item._id, item.FoodQuantity + 1);
    };

    const updateItemQuantity = (itemId, quantity) => {
        fetch(`http://localhost:5000/MyCart/update/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ FoodQuantity: quantity })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.modifiedCount > 0) {
                location.reload();
            }
        })
        .catch((error) => {
            console.error("Error updating item quantity:", error);
        });
    };
    const handleDelete = item => {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
        }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/MyCart/remove/${item._id}`,{
                method: 'DELETE'
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                if (data.deletedCount > 0) {
                    Swal.fire(
                        'Removed!',
                        'Product has been removed.',
                        'success'
                    )
                    location.reload();
                }
            });  
        }
        })
    }

    const totalPrice = items.reduce((total, item) => total + (item.FoodQuantity * item.PricePerUnit), 0);
    

    const handleMoveToOrderHistoryAndRemove = () => {

        if (items.length === 0) {
            return;
        }
    
        const itemIds = items.map(item => item._id);
    
        fetch(`http://localhost:5000/MyCart/moveToOrderHistoryAndRemove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemIds })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.movedCount > 0 && data.deletedCount > 0) {
                document.getElementById('my_modal_2').close();
                Swal.fire('Successful', 'Payment Successful', 'success');
                location.reload();
            } else {
                Swal.fire('Error', 'Failed to buy food items', 'error');
            }
        })
        .catch((error) => {
            console.error("Error to buy food items:", error);
            Swal.fire('Error', 'Failed to buy food items', 'error');
        });
    };

  return (
    <div className="np">
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th></th>
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
                                    <button onClick={() => handleReduceOne(item)} className="tooltip tooltip-top btn btn-xs btn-warning" data-tip="Reduce one">-</button>
                                     &ensp; {item.FoodQuantity} &ensp; 
                                     <button onClick={() => handleAddOne(item)} className="tooltip tooltip-top btn btn-xs btn-warning" data-tip="Add one more">+</button>
                                </td>  
                                <td>
                                    {item.FoodQuantity * item.PricePerUnit}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-sm btn-error">Remove</button>
                                </td>                  
                            </tr>
                            )
                        }
                        <td></td>
                        <th colSpan="3" className="text-right">Total Price</th>
                        <td>{totalPrice}</td>
                        <td>
                            <button onClick={()=>document.getElementById('my_modal_2').showModal()} className="btn btn-sm btn-success">Purchase</button>
                        </td>
                        
                    </tbody>
                </table>
            </div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <div role="tablist" className="tabs tabs-lifted">
                        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Bkash" />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                Account No
                                </label>
                                <input
                                type="text"
                                name="Account"
                                className="mt-1 block w-full rounded-md input-warning"
                                
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                Password
                                </label>
                                <input
                                type="Password"
                                name="Account"
                                className="mt-1 block w-full rounded-md input-warning"
                                
                                />
                            </div>
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Nogot" checked />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                Account No
                                </label>
                                <input
                                type="text"
                                name="Account"
                                className="mt-1 block w-full rounded-md input-warning"
                                
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                Password
                                </label>
                                <input
                                type="Password"
                                name="Account"
                                className="mt-1 block w-full rounded-md input-warning"
                                
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={() => handleMoveToOrderHistoryAndRemove()} className="btn btn-sm btn-success" >Confirm pay</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
  );
};

export default MyCart;
