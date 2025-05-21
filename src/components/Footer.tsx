
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, Facebook, Twitter, Instagram, Calendar, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hotel-dark text-white pt-16 pb-8">
      <div className="hotel-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-hotel-gold">Kamulu Waters Hotel</h3>
            <p className="mb-4">
              Experience luxury and comfort in Kamulu, Kasarani Constituency, Nairobi. Our hotel offers exceptional service and amenities for both business and leisure travelers.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:text-hotel-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:text-hotel-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:text-hotel-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-hotel-gold transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-hotel-gold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-hotel-gold mt-1 flex-shrink-0" />
                <span>Kamulu, Kasarani Constituency, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={20} className="mr-2 text-hotel-gold flex-shrink-0" />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-hotel-gold flex-shrink-0" />
                <span>info@kamuluwatershotel.co.ke</span>
              </li>
              <li className="flex items-center">
                <Calendar size={20} className="mr-2 text-hotel-gold flex-shrink-0" />
                <span>Open 24/7</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-hotel-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-hotel-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-hotel-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/accommodation" className="hover:text-hotel-gold transition-colors">Accommodation</Link>
              </li>
              <li>
                <Link to="/amenities" className="hover:text-hotel-gold transition-colors">Amenities</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-hotel-gold transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-hotel-gold transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/reservation" className="hover:text-hotel-gold transition-colors">Reservation</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-hotel-gold">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for special offers and updates.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-hotel-gold"
              />
              <button type="submit" className="w-full bg-hotel-gold hover:bg-hotel-accent text-white py-2 px-4 rounded transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; {currentYear} Kamulu Waters Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
