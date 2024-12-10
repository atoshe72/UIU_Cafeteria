import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "../../../Components/FoodCard";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can customize this loading state
  }

  return (
    <div className="py-12 md:py-32 ">
      <h1 className="text-5xl font-bold text-center mb-16">
      From Your Favorite Canteen to Your Doorstep, Fast and Fresh!
      </h1>
      <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2">
        {foods.slice(0, 4).map((food) => (
          <FoodCard key={food._id} food={food} noRemove={true} />
        ))}
      </div>
      <Link to="foods">
        <p className="text-yellow-400 font-bold text-center mt-16">View all foods</p>
      </Link>
    </div>
  );
};

export default Foods;
