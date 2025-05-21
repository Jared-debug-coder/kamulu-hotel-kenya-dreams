
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-hotel-gold mb-4">404</h1>
        <p className="text-2xl text-hotel-dark mb-6">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the home page.
        </p>
        <Link to="/" className="hotel-btn inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
