
import { useEffect } from "react";
import { Utensils, Coffee, Wifi, Car, WashingMachine, Users, Dumbbell, PersonStanding, Tv, UtensilsCrossed, Plug, Shield } from 'lucide-react';

const amenitiesData = [
  {
    icon: <Utensils className="h-10 w-10 text-hotel-gold" />,
    title: "Restaurant",
    description: "Our on-site restaurant serves delicious local and international cuisine prepared by our expert chefs using fresh, locally sourced ingredients. Open for breakfast, lunch, and dinner."
  },
  {
    icon: <Coffee className="h-10 w-10 text-hotel-gold" />,
    title: "Bar & Lounge",
    description: "Unwind with your favorite drink in our comfortable lounge area. Choose from a selection of local and international beverages, cocktails, and spirits."
  },
  {
    icon: <Wifi className="h-10 w-10 text-hotel-gold" />,
    title: "Free Wi-Fi",
    description: "Stay connected with complimentary high-speed internet throughout the hotel, allowing you to work, stream, or stay in touch with loved ones during your stay."
  },
  {
    icon: <Car className="h-10 w-10 text-hotel-gold" />,
    title: "Parking",
    description: "Secure on-site parking available for all our guests, with 24-hour surveillance for your peace of mind."
  },
  {
    icon: <WashingMachine className="h-10 w-10 text-hotel-gold" />,
    title: "Laundry Service",
    description: "Keep your clothes fresh with our prompt laundry service. Same-day service available for items received before 9 AM."
  },
  {
    icon: <Users className="h-10 w-10 text-hotel-gold" />,
    title: "Conference Facilities",
    description: "Modern meeting facilities for business events and special occasions, equipped with the latest audiovisual technology and flexible seating arrangements."
  },
  {
    icon: <Dumbbell className="h-10 w-10 text-hotel-gold" />,
    title: "Fitness Center",
    description: "Maintain your fitness routine in our well-equipped gym featuring cardio machines, free weights, and exercise equipment."
  },
  {
    icon: <PersonStanding className="h-10 w-10 text-hotel-gold" />,
    title: "Room Service",
    description: "Enjoy meals and beverages in the comfort of your room with our efficient room service, available from 6 AM to 10 PM daily."
  },
  {
    icon: <Tv className="h-10 w-10 text-hotel-gold" />,
    title: "Satellite TV",
    description: "All rooms are equipped with flat-screen TVs featuring a wide range of local and international channels for your entertainment."
  },
  {
    icon: <UtensilsCrossed className="h-10 w-10 text-hotel-gold" />,
    title: "Breakfast Buffet",
    description: "Start your day right with our extensive breakfast buffet, featuring continental options, local specialties, and made-to-order dishes."
  },
  {
    icon: <Plug className="h-10 w-10 text-hotel-gold" />,
    title: "Power Backup",
    description: "Never experience disruptions with our reliable power backup system that ensures continuous electricity supply throughout the hotel."
  },
  {
    icon: <Shield className="h-10 w-10 text-hotel-gold" />,
    title: "24/7 Security",
    description: "Your safety is our priority. We maintain round-the-clock security personnel and modern surveillance systems throughout the property."
  }
];

const AmenitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Amenities | Kamulu Waters Hotel";
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop"
            alt="Amenities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Hotel Amenities</h1>
            <p className="max-w-3xl mx-auto px-4">
              Discover the range of services and facilities we offer to enhance your stay
            </p>
          </div>
        </div>
      </div>

      {/* Amenities Listing */}
      <section className="section-padding">
        <div className="hotel-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-hotel-dark mb-4">Our Services & Facilities</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              At Kamulu Waters Hotel, we strive to make your stay as comfortable and enjoyable as possible with our comprehensive range of amenities and services.
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
        </div>
      </section>

      {/* Additional Information */}
      <section className="section-padding bg-gray-50">
        <div className="hotel-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-md text-hotel-dark mb-6">Special Requests</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We understand that each guest has unique needs and preferences. If you have specific requirements or special requests, our team is ready to assist you.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Whether you need assistance with arranging transportation, require specific dietary accommodations, or have accessibility requirements, please don't hesitate to contact us before or during your stay.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You can reach our guest services team at <span className="text-hotel-gold font-medium">+254 712 345 678</span> or email <span className="text-hotel-gold font-medium">info@kamuluwatershotel.co.ke</span>.
              </p>
            </div>
            
            <div>
              <h2 className="heading-md text-hotel-dark mb-6">Operating Hours</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Front Desk</span>
                  <span>24 Hours</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Restaurant</span>
                  <span>6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Bar & Lounge</span>
                  <span>11:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Room Service</span>
                  <span>6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Fitness Center</span>
                  <span>6:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Business Center</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AmenitiesPage;
