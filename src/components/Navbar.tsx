
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="hotel-container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="text-2xl font-bold text-hotel-gold">
            <img src="/logo.png" alt="Kamulu Waters Hotel" className="h-16" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 text-hotel-dark">
          <Link to="/" className={`hover:text-hotel-gold transition-colors ${isActive('/') ? 'text-hotel-gold font-semibold' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`hover:text-hotel-gold transition-colors ${isActive('/about') ? 'text-hotel-gold font-semibold' : ''}`}>
            About Us
          </Link>
          <Link to="/accommodation" className={`hover:text-hotel-gold transition-colors ${isActive('/accommodation') ? 'text-hotel-gold font-semibold' : ''}`}>
            Accommodation
          </Link>
          <Link to="/amenities" className={`hover:text-hotel-gold transition-colors ${isActive('/amenities') ? 'text-hotel-gold font-semibold' : ''}`}>
            Amenities
          </Link>
          <Link to="/gallery" className={`hover:text-hotel-gold transition-colors ${isActive('/gallery') ? 'text-hotel-gold font-semibold' : ''}`}>
            Gallery
          </Link>
          <Link to="/contact" className={`hover:text-hotel-gold transition-colors ${isActive('/contact') ? 'text-hotel-gold font-semibold' : ''}`}>
            Contact
          </Link>
          <Link to="/reservation" className="hotel-btn">
            Reservation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-hotel-dark p-2 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <button
            onClick={closeMenu}
            className="mb-4 text-hotel-dark focus:outline-none"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={closeMenu}
              className={`p-2 ${isActive('/') ? 'text-hotel-gold font-semibold' : 'text-hotel-dark'}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className={`p-2 ${isActive('/about') ? 'text-hotel-gold font-semibold' : 'text-hotel-dark'}`}
            >
              About Us
            </Link>
            <Link
              to="/accommodation"
              onClick={closeMenu}
              className={`p-2 ${isActive('/accommodation') ? 'text-hotel-gold font-semibold' : 'text-hotel-dark'}`}
            >
              Accommodation
            </Link>
            <Link
              to="/amenities"
              onClick={closeMenu}
              className={`p-2 ${isActive('/amenities') ? 'text-hotel-gold font-semibold' : 'text-hotel-dark'}`}
            >
              Amenities
            </Link>
            <Link
              to="/gallery"
              onClick={closeMenu}
              className={`p-2 ${isActive('/gallery') ? 'text-hotel-gold font-semibold' : 'text-hotel-dark'}`}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className={`p-2 ${isActive('/contact') ? 'text-hotel-gold font-semibold' : 'text-hotel-dark'}`}
            >
              Contact
            </Link>
            <Link
              to="/reservation"
              onClick={closeMenu}
              className="hotel-btn text-center"
            >
              Reservation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
