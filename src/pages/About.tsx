
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us | Kamulu Waters Hotel";
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        <div className="absolute inset-0">
          <img
            src="/about-hero.jpg"
            alt="About Kamulu Waters Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="heading-lg mb-4">About Us</h1>
            <p className="max-w-3xl mx-auto px-4">
              Learn about our story, vision, and commitment to hospitality excellence
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="section-padding">
        <div className="hotel-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md text-hotel-gold mb-2">Our Story</h2>
              <h3 className="heading-lg text-hotel-dark mb-6">A Legacy of Kenyan Hospitality</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Established in 2010, Kamulu Waters Hotel began as a small family-owned guest house in the serene area of Kamulu, Nairobi. What started as a modest accommodation option for travelers has grown into one of the most respected hotel establishments in the region.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our founder, Mr. James Mwangi, had a vision to create a space where guests could experience authentic Kenyan hospitality while enjoying modern comforts and amenities. His dedication to service excellence and attention to detail continue to guide our operations to this day.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Over the years, we have expanded our facilities, enhanced our services, and built a loyal customer base of both local and international guests. Throughout our growth, we have remained committed to our core values of hospitality, integrity, and community engagement.
              </p>
            </div>
            <div className="relative">
              <img
                src="/history-image.jpg"
                alt="Hotel History"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-gray-50">
        <div className="hotel-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-hotel-dark mb-4">Our Vision & Mission</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We are guided by a clear sense of purpose in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-hotel-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-hotel-dark text-center mb-4">Our Vision</h3>
              <p className="text-gray-700 text-center">
                To be the premier hotel destination in Kamulu, setting the standard for hospitality excellence in Kenya and providing unforgettable experiences that highlight the beauty and culture of our country.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-hotel-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-hotel-dark text-center mb-4">Our Mission</h3>
              <p className="text-gray-700 text-center">
                To provide exceptional hospitality services that exceed guest expectations through personalized attention, comfortable accommodations, and authentic local experiences, while contributing positively to our community and environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section-padding">
        <div className="hotel-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-hotel-dark mb-4">Meet Our Team</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Our dedicated staff works tirelessly to ensure your stay is memorable and comfortable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "James Mwangi",
                position: "Founder & Managing Director",
                image: "/team-1.jpg",
              },
              {
                name: "Sarah Ochieng",
                position: "Hotel Manager",
                image: "/team-2.jpg",
              },
              {
                name: "Daniel Njoroge",
                position: "Executive Chef",
                image: "/team-3.jpg",
              },
              {
                name: "Grace Wanjiru",
                position: "Customer Relations Manager",
                image: "/team-4.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 overflow-hidden rounded-full w-48 h-48 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-hotel-dark mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
