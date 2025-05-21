
import { Link } from 'react-router-dom';
import { Calendar, CalendarClock } from 'lucide-react';

const MeetingsEvents = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="hotel-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-hotel-dark mb-4">Meetings & Events</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Host your next business meeting, conference, wedding or special celebration in our versatile event spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-hotel-dark mb-4">Perfect Space for Every Occasion</h3>
            <p className="text-gray-700 mb-6">
              Our elegant event spaces can accommodate groups of various sizes, from intimate business meetings to grand celebrations. Each space features modern amenities and can be customized to meet your specific requirements.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <CalendarClock className="h-5 w-5 text-hotel-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Conference Room</h4>
                  <p className="text-gray-600">Ideal for business meetings, seminars, and corporate events. Capacity up to 100 people.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-hotel-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Event Hall</h4>
                  <p className="text-gray-600">Perfect for weddings, gala dinners, and large celebrations. Capacity up to 250 people.</p>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="hotel-btn inline-block">
              Inquire Now
            </Link>
          </div>
          
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=1470&auto=format&fit=crop"
              alt="Kamulu Waters Hotel Meeting Room" 
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetingsEvents;
