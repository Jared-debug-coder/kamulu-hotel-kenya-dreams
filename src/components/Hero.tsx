
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useEffect, useState } from 'react';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?q=80&w=1470&auto=format&fit=crop",
      alt: "Kenyan Safari Landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?q=80&w=1470&auto=format&fit=crop",
      alt: "Luxury Kenyan Resort"
    },
    {
      src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1471&auto=format&fit=crop",
      alt: "Nairobi Skyline View"
    },
    {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1470&auto=format&fit=crop",
      alt: "Kenyan Restaurant Experience"
    },
    {
      src: "https://images.unsplash.com/photo-1541004995602-b3e898709909?q=80&w=1470&auto=format&fit=crop",
      alt: "Kenyan Conference Setting"
    }
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Effect to update carousel when activeIndex changes
  useEffect(() => {
    const carouselItems = document.querySelectorAll(".embla__slide");
    if (carouselItems && carouselItems.length > 0) {
      const targetElement = carouselItems[activeIndex] as HTMLElement;
      targetElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [activeIndex]);

  return (
    <div className="relative h-screen">
      {/* Hero Image Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel 
          className="w-full h-full" 
          opts={{ loop: true, duration: 50 }}
        >
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
          <CarouselPrevious className="left-4 h-10 w-10 opacity-70 hover:opacity-100" />
          <CarouselNext className="right-4 h-10 w-10 opacity-70 hover:opacity-100" />
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
