import { useLoaderData } from "react-router-dom";
import FoodCard from "../../../Components/FoodCard";

const MyProduct = () => {
    const myFoods = useLoaderData();
    return (
        <div className="py-12 md:py-32 ">
            <h1 className="text-5xl font-bold text-center mb-16">Your Products</h1>
            <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            {myFoods.map(food => (
                <FoodCard key={food._id} food={food} />
            ))}
            </div>
        </div>
    );
};

export default MyProduct;