
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



interface RoomType {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  bedType: string;
  image: string;
  amenities: string[];
}

const roomsData: RoomType[] = [
  {
    id: 1,
    name: "Standard Room",
    description: "Cozy and comfortable room ideal for solo travelers or couples on a budget.",
    price: 6500,
    capacity: 2,
    size: 25,
    bedType: "1 Queen Bed",
    image: "/room1.avif",
    amenities: ["Free Wi-Fi", "Air Conditioning", "TV", "Private Bathroom", "Work Desk"]
  },
  {
    id: 2,
    name: "Deluxe Room",
    description: "Spacious room with modern amenities and beautiful views of the surroundings.",
    price: 8500,
    capacity: 2,
    size: 32,
    bedType: "1 King Bed",
    image: "/room2.avif",
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Private Bathroom", "Coffee Maker", "Safe", "Minibar"]
  },
  {
    id: 3,
    name: "Executive Suite",
    description: "Luxurious suite with separate living area and premium amenities for a truly comfortable stay.",
    price: 15000,
    capacity: 2,
    size: 48,
    bedType: "1 King Bed",
    image: "/room3.avif",
    amenities: ["Free Wi-Fi", "Air Conditioning", "55\" Smart TV", "Living Area", "Premium Bathroom", "Coffee Maker", "Safe", "Minibar", "Balcony"]
  },
  {
    id: 4,
    name: "Family Room",
    description: "Perfect for families, with spacious accommodation for up to 4 guests.",
    price: 12000,
    capacity: 4,
    size: 45,
    bedType: "1 King Bed + 2 Twin Beds",
    image: "/room4.avif",
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Family Bathroom", "Coffee Maker", "Safe", "Refrigerator"]
  },
  {
    id: 5,
    name: "Presidential Suite",
    description: "Our most luxurious accommodation with expansive space and top-tier amenities for an unforgettable stay.",
    price: 25000,
    capacity: 4,
    size: 75,
    bedType: "1 King Bed + Sofa Bed",
    image: "/room5.avif",
    amenities: ["Free Wi-Fi", "Air Conditioning", "65\" Smart TV", "Separate Living Room", "Dining Area", "Luxury Bathroom with Jacuzzi", "Kitchenette", "Premium Minibar", "Private Balcony"]
  }
];

const Accommodation = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Accommodation | Kamulu Waters Hotel";
  }, []);

  const openModal = (room: RoomType) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        <div className="absolute inset-0">
          <img
            src="/home.avif"
            alt="Accommodation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Our Accommodations</h1>
            <p className="max-w-3xl mx-auto px-4">
              Discover our range of comfortable and elegant rooms and suites
            </p>
          </div>
        </div>
      </div>

      {/* Room Listings */}
      <section className="section-padding">
        <div className="hotel-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-hotel-dark mb-4">Find Your Perfect Stay</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Each of our accommodations is designed with your comfort in mind, featuring modern amenities and elegant decor.
            </p>
          </div>

          <div className="space-y-12">
            {roomsData.map((room) => (
              <div key={room.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-200 pb-12">
                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-hotel-dark">{room.name}</h3>
                    <p className="bg-hotel-gold text-white py-1 px-3 rounded-full">
                      KES {room.price.toLocaleString()}/night
                    </p>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{room.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-hotel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>{room.capacity} Guests</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-hotel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"></path>
                      </svg>
                      <span>{room.size} m²</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-hotel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                      </svg>
                      <span>{room.bedType}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <button
                        onClick={() => openModal(room)}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-200"
                      >
                        +{room.amenities.length - 4} more
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => openModal(room)}
                      className="px-6 py-3 bg-white border border-hotel-gold text-hotel-gold font-medium rounded hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                                     <Link
                    to="/reservation"
                    state={{ room }}
                    className="px-6 py-3 bg-hotel-gold text-white font-medium rounded hover:bg-hotel-accent transition-colors text-center"
                  >
                    Book Now
                  </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-hotel-dark">{selectedRoom.name}</h3>
                <p className="bg-hotel-gold text-white py-1 px-4 rounded-full">
                  KES {selectedRoom.price.toLocaleString()}/night
                </p>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedRoom.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-hotel-dark mb-2">Room Details</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2">•</span> {selectedRoom.size} m² room size
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2">•</span> {selectedRoom.bedType}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2">•</span> Up to {selectedRoom.capacity} guests
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg md:col-span-2">
                  <h4 className="font-semibold text-hotel-dark mb-2">Room Amenities</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <span className="mr-2">•</span> {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                             <Link
                to="/reservation"
                state={{ room: selectedRoom }}
                onClick={closeModal}
                className="px-6 py-3 bg-hotel-gold text-white font-medium rounded hover:bg-hotel-accent transition-colors text-center"
              >
                Book This Room
              </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accommodation;
