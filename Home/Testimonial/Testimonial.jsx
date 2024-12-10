import person1 from "../../../assets/images/person_1.jpg";
import person2 from "../../../assets/images/person_2.jpg";
import person3 from "../../../assets/images/person_3.jpg";

const Testimonial = ({ imageSrc, name, content }) => {
  return (
    <div className="p-8 bg-white shadow-md rounded-md">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={imageSrc}
          alt= "Profile"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
      </div>
      <p className="text-gray-700 mb-6">{content}</p>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      imageSrc: person2,
      name: 'Emily Johnson',
      content:
        'Good'
    },
    {
      imageSrc: person1,
      name: 'David Smith',
      content:
        'JOSS'
    },
    {
      imageSrc: person3,
      name: 'Sarah Turner',
      content:
        'Excellent'
    }
  ];

  return (
    <div className="py-12 md:py-32">
        <h1 className="text-5xl font-bold text-center mb-16">Testimonials</h1>
        <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
        ))}
        </div>
    </div>
  );
};

export default Testimonials;
