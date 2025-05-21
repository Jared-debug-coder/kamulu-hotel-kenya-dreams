
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-image.jpg"
          alt="Kamulu Waters Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-white heading-xl mb-6">
            Welcome to Kamulu Waters Hotel
          </h1>
          <p className="text-white text-xl md:text-2xl mb-8">
            Home Away from Home
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/about" className="hotel-btn">
              About Us
            </Link>
            <Link to="/reservation" className="px-6 py-3 bg-white text-hotel-dark font-medium rounded hover:bg-gray-100 transition-colors duration-300">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
