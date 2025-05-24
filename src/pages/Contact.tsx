
import { useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us | Kamulu Waters Hotel";
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        <div className="absolute inset-0">
          <img
            src="/phone.webp"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Contact Us</h1>
            <p className="max-w-3xl mx-auto px-4">
              We're here to answer any questions you may have
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info & Form */}
      <section className="section-padding">
        <div className="hotel-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-hotel-dark mb-4">Get in Touch</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Whether you have a question about our rooms, amenities, or need assistance with a booking, our team is ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h3 className="text-2xl font-semibold text-hotel-dark mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-hotel-gold rounded-full p-3 mr-4 flex-shrink-0">
                      <PhoneCall className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-hotel-dark mb-1">Phone</h4>
                      <p className="text-gray-700">+254 710464858</p>
                      <p className="text-gray-700">+254 712 345 679</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-hotel-gold rounded-full p-3 mr-4 flex-shrink-0">
                      <Mail className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-hotel-dark mb-1">Email</h4>
                      <p className="text-gray-700">info@kamuluwatershotel.co.ke</p>
                      <p className="text-gray-700">reservations@kamuluwatershotel.co.ke</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-hotel-gold rounded-full p-3 mr-4 flex-shrink-0">
                      <MapPin className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-hotel-dark mb-1">Address</h4>
                      <p className="text-gray-700">123 Kangundo Road</p>
                      <p className="text-gray-700">Kamulu, Nairobi</p>
                      <p className="text-gray-700">Kenya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-hotel-gold rounded-full p-3 mr-4 flex-shrink-0">
                      <Clock className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-hotel-dark mb-1">Hours</h4>
                      <p className="text-gray-700">Check-in: 2:00 PM - 10:00 PM</p>
                      <p className="text-gray-700">Check-out: By 11:00 AM</p>
                      <p className="text-gray-700">Front Desk: 24 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-hotel-dark mb-6">Location</h3>
                <div className="rounded-lg overflow-hidden h-72">
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.56476657016!2d37.07598218358695!3d-1.2452240704476432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f6639b73ae50d%3A0xbf8b42bd8718c265!2sKamulu%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1715205710127!5m2!1sen!2ske"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="hotel-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-hotel-dark mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Find quick answers to common questions about our hotel and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What are your check-in and check-out times?",
                  answer: "Check-in is from 2:00 PM to 10:00 PM, and check-out is by 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability."
                },
                {
                  question: "Do you offer airport transfers?",
                  answer: "Yes, we provide airport transfers for an additional fee. Please contact our front desk at least 24 hours in advance to arrange this service."
                },
                {
                  question: "Is breakfast included in the room rate?",
                  answer: "Breakfast is included in most of our room rates. Please check your booking confirmation or contact us directly to confirm if breakfast is included in your reservation."
                },
                {
                  question: "Do you have parking facilities?",
                  answer: "Yes, we offer complimentary parking for all our guests with 24-hour security surveillance."
                },
                {
                  question: "What amenities are available at the hotel?",
                  answer: "Our hotel features a restaurant, bar, free Wi-Fi, fitness center, conference facilities, and laundry services, among other amenities. Visit our Amenities page for a complete list."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-hotel-dark mb-2">{faq.question}</h4>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
