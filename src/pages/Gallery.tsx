
import { useState, useEffect } from "react";

const galleryImages = [
  {
    id: 1,
    src: "/rest1.avif",
    alt: "Hotel Exterior",
    category: "hotel"
  },
  {
    id: 2,
    src: "/rest2.avif",
    alt: "Deluxe Room",
    category: "rooms"
  },
  {
    id: 3,
    src: "/rest3.avif",
    alt: "Restaurant",
    category: "dining"
  },
  {
    id: 4,
    src: "/rest4.avif",
    alt: "Executive Suite",
    category: "rooms"
  },
  {
    id: 5,
    src: "/rest5.avif",
    alt: "Hotel Lobby",
    category: "hotel"
  },
  {
    id: 6,
    src: "/rest6.avif",
    alt: "Conference Room",
    category: "events"
  },
  {
    id: 7,
    src: "/rest7.avif",
    alt: "Breakfast Buffet",
    category: "dining"
  },
  {
    id: 8,
    src: "/rest8.avif",
    alt: "Swimming Pool",
    category: "amenities"
  },
  {
    id: 9,
    src: "/rest9.avif",
    alt: "Standard Room",
    category: "rooms"
  },
  {
    id: 10,
    src: "/rest10.avif",
    alt: "Bar Area",
    category: "dining"
  },
  {
    id: 11,
    src: "/rest11.avif",
    alt: "Hotel Gardens",
    category: "hotel"
  },
  {
    id: 12,
    src: "/rest12.avif",
    alt: "Family Room",
    category: "rooms"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Gallery | Kamulu Waters Hotel";
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(image => image.category === filter));
    }
  }, [filter]);

  const openModal = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        <div className="absolute inset-0">
          <img
            src="/rest1.avif"
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Our Gallery</h1>
            <p className="max-w-3xl mx-auto px-4">
              Take a visual tour of our hotel facilities and accommodations
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="hotel-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-hotel-dark mb-6">Explore Our Hotel</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-2 rounded-full transition-colors ${filter === "all" ? 'bg-hotel-gold text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("hotel")}
                className={`px-6 py-2 rounded-full transition-colors ${filter === "hotel" ? 'bg-hotel-gold text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Hotel & Grounds
              </button>
              <button
                onClick={() => setFilter("rooms")}
                className={`px-6 py-2 rounded-full transition-colors ${filter === "rooms" ? 'bg-hotel-gold text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Rooms & Suites
              </button>
              <button
                onClick={() => setFilter("dining")}
                className={`px-6 py-2 rounded-full transition-colors ${filter === "dining" ? 'bg-hotel-gold text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Dining
              </button>
              <button
                onClick={() => setFilter("amenities")}
                className={`px-6 py-2 rounded-full transition-colors ${filter === "amenities" ? 'bg-hotel-gold text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Amenities
              </button>
              <button
                onClick={() => setFilter("events")}
                className={`px-6 py-2 rounded-full transition-colors ${filter === "events" ? 'bg-hotel-gold text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Events
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group h-64"
                onClick={() => openModal(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                    </svg>
                    <p className="mt-2 text-lg font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <div className="max-w-4xl max-h-[80vh] w-full">
            <img
              src={galleryImages.find(img => img.id === selectedImage)?.src}
              alt={galleryImages.find(img => img.id === selectedImage)?.alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="text-white text-center mt-4 text-lg">
              {galleryImages.find(img => img.id === selectedImage)?.alt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
