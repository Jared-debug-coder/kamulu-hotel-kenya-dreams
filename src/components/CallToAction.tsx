import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/utils';

const CallToAction = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-hotel-dark opacity-80 z-0"></div>
      <div 
        className="absolute inset-0 z-10" 
        style={{ 
          backgroundImage: `url('${getImageUrl('cta-bg.jpg')}')`,
          backgroundPosition: "center", 
          backgroundSize: "cover", 
          opacity: 0.2 
        }}
      ></div>
      
      <div className="hotel-container relative z-20">
        <div className="text-center text-white">
          <h2 className="heading-lg mb-6">Ready to Experience Luxury in Kamulu?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Book your stay today and enjoy our special rates and packages. Your perfect getaway in Nairobi awaits!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/reservation" className="px-8 py-3 bg-hotel-gold hover:bg-hotel-accent text-white font-medium text-lg rounded-md transition-colors duration-300">
              Book Now
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-hotel-dark text-white font-medium text-lg rounded-md transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
