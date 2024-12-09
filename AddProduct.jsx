import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { reset,  } = useForm();
    const {user} = useContext(AuthContext)
    const handleAddProduct = event =>{
        event.preventDefault();
        const form = event.target;
        const Image = form.Image.value;
        const Name = form.Name.value;
        const SellerName = user.displayName;
        const SellerEmail = user.email;
        const SellerPhoto = user.photoURL;
        const Category = form.Category.value;
        const QuantityAvailable = form.QuantityAvailable.value;
        const Price = form.Price.value;
        const Description = form.Description.value;

        const NewProduct = {SellerName, SellerEmail, SellerPhoto, Image, Name, Category, QuantityAvailable, Price, Description} 
        
        console.log(NewProduct);
        fetch('http://localhost:5000/foods',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(NewProduct)
        })
        .then(res => res.json())
        .then(data => {console.log(data);
            if (data.acknowledged){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                window.location.reload();
            
            }
        })
    
    }


    return (
       <div className="flex justify-center items-center h-screen">
      <div className="p-8 rounded shadow-lg w-[50%]">
        <h1 className="text-3xl font-semibold mb-4">Add Product</h1>
        <form onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="Name"
              className="mt-1 block w-full rounded-md input-warning"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="Category"
              className="mt-1 block w-full rounded-md input-warning"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="Description"
              className="mt-1 block w-full rounded-md input-warning"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="Price"
              className="mt-1 block w-full rounded-md input-warning"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quantity Available
            </label>
            <input
              type="number"
              name="QuantityAvailable"
              className="mt-1 block w-full rounded-md input-warning"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="text"
              name="Image"
              className="mt-1 block w-full input-warning"
              
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="py-2 px-4 btn btn-warning"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
    );
};

export default AddProduct;