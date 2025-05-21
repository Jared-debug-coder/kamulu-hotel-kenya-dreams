
import { Utensils, Coffee, Wifi, Car, WashingMachine, Users, Calendar, Meeting } from 'lucide-react';
import { Link } from 'react-router-dom';

const amenitiesData = [
  {
    icon: <Utensils className="h-10 w-10 text-hotel-gold" />,
    title: "Restaurant",
    description: "Enjoy delicious local and international cuisine prepared by our expert chefs."
  },
  {
    icon: <Coffee className="h-10 w-10 text-hotel-gold" />,
    title: "Bar & Lounge",
    description: "Relax with your favorite drink in our comfortable lounge area."
  },
  {
    icon: <Wifi className="h-10 w-10 text-hotel-gold" />,
    title: "Free Wi-Fi",
    description: "Stay connected with complimentary high-speed internet throughout the hotel."
  },
  {
    icon: <Car className="h-10 w-10 text-hotel-gold" />,
    title: "Parking",
    description: "Secure on-site parking available for all our guests."
  },
  {
    icon: <Meeting className="h-10 w-10 text-hotel-gold" />,
    title: "Event Space",
    description: "Perfect venues for weddings, celebrations and special occasions."
  },
  {
    icon: <Calendar className="h-10 w-10 text-hotel-gold" />,
    title: "Meeting Rooms",
    description: "Professional spaces for business meetings, seminars, and conferences."
  },
  {
    icon: <WashingMachine className="h-10 w-10 text-hotel-gold" />,
    title: "Laundry Service",
    description: "Keep your clothes fresh with our prompt laundry service."
  },
  {
    icon: <Users className="h-10 w-10 text-hotel-gold" />,
    title: "Conference Room",
    description: "Modern meeting facilities for business events and special occasions."
  }
];

const Amenities = () => {
  return (
    <section className="section-padding">
      <div className="hotel-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-hotel-dark mb-4">Our Amenities</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            We offer a range of services and facilities to make your stay comfortable and enjoyable. From dining options to business services, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenitiesData.map((amenity, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md transition-transform hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="mb-4">{amenity.icon}</div>
              <h3 className="text-xl font-semibold text-hotel-dark mb-2">{amenity.title}</h3>
              <p className="text-gray-600">{amenity.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/amenities" className="hotel-btn inline-block">
            Explore All Amenities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
