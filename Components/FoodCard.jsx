import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom';

const FoodCard = ({food, noRemove}) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const role = localStorage.getItem('Role');

    const handleAddToCart = food => {
        if(!user){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Login to add food to cart',
                showConfirmButton: false,
                timer: 1500,
                });
            Navigate('/Login', {state: {from: location}})
            return;
        }
        const MyEmail = user.email;
        const FoodName  = food.Name;
        const Image  = food.Image;
        const FoodQuantity  = 1;
        const PricePerUnit  = food.Price;

        fetch('http://localhost:5000/MyCart',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({MyEmail, FoodName, FoodQuantity, Image, PricePerUnit})
        })
            .then((res) => res.json())
            .then((data) => {
            if (data.acknowledged) {
                Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${food.Name} has added to your cart`,
                showConfirmButton: false,
                timer: 1500,
                });
            }
        });        
    };
    const handleDelete = food => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/foods/${food._id}`,{
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                    if (data.acknowledged) {
                        window.location.reload();
                        Swal.fire(
                            'Removed!',
                            'Product has been removed.',
                            'success'
                        )
                    }
                });  
            }
            })
        }
    return (
        <div className={`card bg-base-200 shadow-xl ${food.QuantityAvailable<1 && 'bg-red-200'}`}>
        <figure><img className="pt-12" width={500} height={500} src={food.Image} alt={food.Name}/></figure>
        <div className={`card-body`}>
            <h2 className="card-title">{food.Name}</h2>
            <p>Category: {food.Category}</p>
            <p>Price: {food.Price}</p>
            <p>{food.Description}</p>
            {
                food.QuantityAvailable>1 &&
                <div className="card-actions justify-end">
                    
                    { (role == 'Admin' || role == 'Seller') &&   !noRemove ?
                        <button onClick={() => handleDelete(food)} className="btn btn-sm btn-error">Remove</button>
                       : noRemove? <button onClick={() => handleAddToCart(food)} className="btn btn-outline btn-warning">ADD TO CART</button>
                        : ""
                    }
                </div>}
            {
               food.QuantityAvailable<1 &&
               <div className="card-actions justify-end">
                    <p className="text-red-500 font-bold text-right">OUT OF STOCK</p> <br />
                    { (role == 'Admin' || role == 'Seller') &&
                        <button onClick={() => handleDelete(food)} className="btn btn-sm btn-error">Remove</button>
                    }
                </div>
            }
        </div>
    </div>
    );
};

export default FoodCard;