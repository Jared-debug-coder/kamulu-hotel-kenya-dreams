
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  size: number;
  amenities: string[];
}

const roomsData: Room[] = [
  {
    id: 1,
    name: "Deluxe Room",
    description: "Spacious room with modern amenities and beautiful views.",
    price: 8500,
    image: "/deluxe-room.jpg",
    capacity: 2,
    size: 32,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Private Bathroom"]
  },
  {
    id: 2,
    name: "Executive Suite",
    description: "Luxurious suite with separate living area and premium amenities.",
    price: 15000,
    image: "/executive-suite.jpg",
    capacity: 2,
    size: 48,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Mini Bar", "Living Area", "Balcony"]
  },
  {
    id: 3,
    name: "Family Room",
    description: "Perfect for families, with spacious accommodation for up to 4 guests.",
    price: 12000,
    image: "/family-room.jpg",
    capacity: 4,
    size: 45,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Family Bathroom"]
  }
];

const FeaturedRooms = () => {
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);

  return (
    <section className="section-padding bg-gray-50">
      <div className="hotel-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-hotel-dark mb-4">Featured Accommodations</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Choose from our selection of thoughtfully designed rooms and suites that combine comfort with elegance. Each accommodation option offers unique amenities to make your stay memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{
                    transform: hoveredRoom === room.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                <div className="absolute top-4 right-4 bg-hotel-gold text-white py-1 px-3 rounded-full">
                  KES {room.price.toLocaleString()} / night
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-hotel-dark mb-2">{room.name}</h3>
                <p className="text-gray-700 mb-4">{room.description}</p>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <span>{room.capacity} Guests</span>
                  <span>{room.size} m²</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/accommodation/${room.id}`}
                    className="text-hotel-gold hover:underline font-medium"
                  >
                    View Details
                  </Link>
                  <Link
                    to="/reservation"
                    className="bg-hotel-gold hover:bg-hotel-accent text-white py-2 px-4 rounded transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/accommodation"
            className="hotel-btn inline-block"
          >
            View All Rooms
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
