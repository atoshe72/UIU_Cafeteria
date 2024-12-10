import { useState } from 'react';
import bg1 from "../../../assets/images/bg1.jpg";
import bg2 from "../../../assets/images/bg2.jpg";
import bg3 from "../../../assets/images/bg3.jpg";
import { Link } from 'react-router-dom';

const Slides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: bg1, legend: "Your Favorite Restaurants, Delivered Fast" },
    { image: bg2, legend: "Taste the Best from Local Eateries" },
    { image: bg3, legend: "Craving Something? We’ve Got You Covered" },
  ];

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full">
      <div className="carousel w-full max-h-[80vh]">
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-item ${index === currentSlide ? 'block' : 'hidden'}`}>
            <img src={slide.image} className="w-full" alt={`Slide ${index + 1}`} />
            <div className="legend absolute top-1/2 left-5 md:left-10 lg:left-20 w-full bg-opacity-75 text-white px-4 py-2">
              <p className='text-4xl font-bold'>{slide.legend}</p>
              <Link to="/Foods" className="btn btn-warning mt-5">BUY NOW</Link>
            </div>
          </div>
        ))}
        <div className="carousel-nav absolute bottom-5 left-0 w-full flex justify-center py-2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`btn btn-xs ${index === currentSlide ? 'bg-yellow-400' : 'bg-gray-300 hover:bg-gray-400'}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slides;
