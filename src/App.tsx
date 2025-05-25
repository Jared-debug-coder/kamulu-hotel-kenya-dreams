
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Accommodation from "./pages/Accommodation";
import AmenitiesPage from "./pages/Amenities";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import Menu from "./components/menu";
import DrinkMenu from "./components/drink-menu";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/kamulu-hotel-kenya-dreams">
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/amenities" element={<AmenitiesPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
             <Route path="/menu" element={<Menu />} />           {/* <-- Add this */}
             <Route path="/drink-menu" element={<DrinkMenu />} /> {/* <-- And this */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
