
import { Link } from 'react-router-dom';
import { Utensils, Coffee } from 'lucide-react';

const DiningOptions = () => {
  return (
    <section className="section-padding">
      <div className="hotel-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-hotel-dark mb-4">Dining at Kamulu Waters</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Experience culinary excellence with our diverse dining options crafted to satisfy every palate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Restaurant Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Utensils className="h-8 w-8 text-hotel-gold mr-3" />
              <h3 className="text-2xl font-semibold text-hotel-dark">Savanna Restaurant</h3>
            </div>
            
            <img 
              src="/restaurant.jpg"
              alt="Kamulu Waters Restaurant"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <p className="text-gray-700 mb-4">
              Our signature restaurant serves a delightful blend of Kenyan and international cuisines, prepared with fresh, locally-sourced ingredients by our talented chefs.
            </p>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Opening Hours:</h4>
              <ul className="text-gray-700">
                <li>Breakfast: 6:30 AM - 10:30 AM</li>
                <li>Lunch: 12:30 PM - 3:00 PM</li>
                <li>Dinner: 6:30 PM - 10:30 PM</li>
              </ul>
            </div>
            
            <Link to="/contact" className="hotel-btn inline-block">
              View Menu
            </Link>
          </div>
          
          {/* Bar & Lounge Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Coffee className="h-8 w-8 text-hotel-gold mr-3" />
              <h3 className="text-2xl font-semibold text-hotel-dark">Horizon Bar & Lounge</h3>
            </div>
            
            <img 
              src="/bar.jpg"
              alt="Kamulu Waters Bar & Lounge"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <p className="text-gray-700 mb-4">
              Unwind in our elegant bar and lounge, offering an extensive selection of fine wines, premium spirits, cocktails, and light bites in a relaxed atmosphere.
            </p>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Opening Hours:</h4>
              <ul className="text-gray-700">
                <li>Sunday - Thursday: 11:00 AM - 11:00 PM</li>
                <li>Friday - Saturday: 11:00 AM - 1:00 AM</li>
                <li>Happy Hour: 5:00 PM - 7:00 PM daily</li>
              </ul>
            </div>
            
            <Link to="/contact" className="hotel-btn inline-block">
              View Drinks Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiningOptions;
