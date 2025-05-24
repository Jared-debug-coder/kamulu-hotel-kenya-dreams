
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useEffect, useState } from 'react';
import { getImageUrl } from '@/lib/utils';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const heroImages = [
    {
      src: getImageUrl("home.avif")
      
    },
    {
      src: getImageUrl("hero1.jpg")
      
    },
    {
      src: getImageUrl("hero2.jpg")
      
    },
    {
      src: getImageUrl("hero3.jpg")
      
    },
    {
      src: getImageUrl("hero4.jpg")
      
    },
    {
      src: getImageUrl("hero5.jpg")
      
    },
    {
      src: getImageUrl("hero6.jpg")
      
    },
    {
      src: getImageUrl("hero7.jpg")
      
    },
    {
      src: getImageUrl("hero8.jpg")
      
    },
    {
      src: getImageUrl("hero9.jpg")
      
    },
    {
      src: getImageUrl("hero10.webp")
      
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
    <div className="absolute inset-0 z-0 overflow-hidden">
      <img
        src={heroImages[activeIndex].src}
        className="w-full h-full object-cover"
        alt="Hero"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-white heading-xl mb-6">
            Welcome to Kamulu Waters Hotel
          </h1>
          <p className="text-white text-xl md:text-2xl mb-8">
            Home Away from Home in Kamulu
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
