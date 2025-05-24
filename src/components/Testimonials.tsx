
const testimonials = [
  {
    id: 1,
    name: "John Kamau",
    position: "Business Traveler",
    quote: "Exceptional service and comfortable rooms. The staff went above and beyond to make my business trip a success. I'll definitely be returning on my next visit to Nairobi.",
    avatar: "/jared.jpg"
  },
  {
    id: 2,
    name: "Jane Wanjiku",
    position: "Family Vacation",
    quote: "Our family had an amazing stay at Kamulu Waters Hotel. The rooms were spacious, the food was delicious, and the location was perfect for exploring the city.",
    avatar: "/liza.jpg"
  },
  {
    id: 3,
    name: "David Omondi",
    position: "Weekend Getaway",
    quote: "A perfect weekend retreat! The peaceful environment and excellent amenities made our short stay very relaxing. We particularly enjoyed the restaurant's local dishes.",
    avatar: "/jared.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="hotel-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-hotel-dark mb-4">What Our Guests Say</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what some of our recent guests have to say about their experience at Kamulu Waters Hotel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-hotel-dark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
