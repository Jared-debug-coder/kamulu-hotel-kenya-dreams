
import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/utils';

const AboutPreview = () => {
  return (
    <section className="section-padding bg-white">
      <div className="hotel-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-lg text-hotel-dark mb-6">
              Discover Luxury in Kamulu
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Nestled in the serene environment of Kamulu, Nairobi, Kamulu Waters Hotel offers a perfect blend of comfort, luxury, and authentic Kenyan hospitality. Our hotel is designed to provide guests with an unforgettable experience, whether you're visiting for business or leisure.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              With spacious rooms, modern amenities, and attentive service, we strive to make your stay as comfortable as possible. Our strategic location provides easy access to Nairobi's business districts while offering a peaceful retreat from the hustle and bustle of city life.
            </p>
            <Link to="/about" className="hotel-btn inline-block">
              Learn More
            </Link>
          </div>
          <div className="relative">
            <img
              src={getImageUrl('rest2.avif')}
              alt="Hotel Exterior"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-hotel-gold text-white p-6 rounded-lg shadow-lg hidden md:block">
              <p className="text-lg font-semibold">2+ Years</p>
              <p>Of Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
