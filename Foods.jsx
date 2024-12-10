import {useLoaderData } from "react-router-dom";
import FoodCard from "../../Components/FoodCard";

const Foods = () => {

    const foods = useLoaderData();
    console.log(foods);
    return (
        <div className="py-12 md:py-32 ">
            <h1 className="text-5xl font-bold text-center mb-16">From Your Favorite Canteen to Your Doorstep, Fast and Fresh!</h1>
            <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            {foods.map(food => (
                <FoodCard key={food._id} food={food} noRemove={true} />
            ))}
            </div>
                <p className="text-yellow-400 font-bold text-center mt-16">More Foods Are Coming Soon</p>
        </div>
    );
};

export default Foods;