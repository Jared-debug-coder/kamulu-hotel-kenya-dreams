
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const Hero = () => {
  const heroImages = [
    {
      src: "/hero-image.jpg",
      alt: "Kamulu Waters Hotel Front View"
    },
    {
      src: "/deluxe-room.jpg",
      alt: "Luxury Accommodation"
    },
    {
      src: "/family-room.jpg",
      alt: "Family Friendly Rooms"
    }
  ];

  return (
    <div className="relative h-screen">
      {/* Hero Image Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel className="w-full h-full" opts={{ loop: true, duration: 50 }}>
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="w-full h-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-white heading-xl mb-6">
            Welcome to Kamulu Waters Hotel
          </h1>
          <p className="text-white text-xl md:text-2xl mb-8">
            Home Away from Home in Kamulu, Kasarani Constituency, Nairobi
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/about" className="hotel-btn">
              About Us
            </Link>
            <Link to="/reservation" className="px-6 py-3 bg-white text-hotel-dark font-medium rounded hover:bg-gray-100 transition-colors duration-300">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
