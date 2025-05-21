
import { useEffect } from "react";
import BookingForm from "@/components/BookingForm";

const Reservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Reservation | Kamulu Waters Hotel";
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        <div className="absolute inset-0">
          <img
            src="/reservation-hero.jpg"
            alt="Make a Reservation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Make a Reservation</h1>
            <p className="max-w-3xl mx-auto px-4">
              Book your stay at Kamulu Waters Hotel for an unforgettable experience
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="hotel-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-hotel-dark mb-4">Reserve Your Stay</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Complete the form below to request a reservation at Kamulu Waters Hotel. Our team will confirm your booking via email.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="section-padding bg-gray-50">
        <div className="hotel-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-hotel-dark mb-4">Reservation Policies</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Please review our policies before making a reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-hotel-dark mb-4">Payment Policy</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-hotel-gold mr-2">•</span>
                  <span>A 30% deposit is required to confirm your reservation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hotel-gold mr-2">•</span>
                  <span>Full payment is due upon check-in.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hotel-gold mr-2">•</span>
                  <span>We accept cash, Mpesa, and major credit cards including Visa and Mastercard.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-hotel-dark mb-4">Cancellation Policy</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-hotel-gold mr-2">•</span>
                  <span>Cancellations made 48 hours or more before check-in receive a full refund.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hotel-gold mr-2">•</span>
                  <span>Cancellations made between 24-48 hours before check-in receive a 50% refund.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hotel-gold mr-2">•</span>
                  <span>Cancellations made less than 24 hours before check-in are non-refundable.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-hotel-dark mb-4">Check-in/Check-out</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-hotel-gold mr-2">•</span>
                  <span>Check-in time: 2:00 PM - 10:00 PM.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hotel-gold mr-2">•</span>
                  <span>Check-out time: By 11:00 AM.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hotel-gold mr-2">•</span>
                  <span>Early check-in and late check-out are subject to availability and may incur additional charges.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservation;
