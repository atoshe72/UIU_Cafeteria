
import Testimonials from "../Testimonial/Testimonial";
import Offer from "../Offer/Offer";
import Slides from "../Slides/Slides";
import Foods from "../Foods/Foods";
import {Link, useLoaderData } from "react-router-dom";

const Home = () => {

    const sellers = useLoaderData();

    console.log(sellers);

    return (
        <div  >
            <Slides></Slides>
            <Foods></Foods>
            <Offer></Offer>


            <div className="py-12 md:py-32">
                <h1 className="text-5xl font-bold text-center mb-16">Available Canteens</h1>
                
                {/* Canteen Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sellers.map((seller) => (
                    <div key={seller._id} className="border rounded-lg shadow-lg p-4">
                    <img
                        src={seller.image}
                        alt={seller.name}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />
                    <Link to={`foods/${seller.email}`}>
                        <h2 className="text-2xl font-bold text-center">{seller.name}</h2>
                    </Link>
                    </div>
                ))}
                </div>
            </div>

            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;