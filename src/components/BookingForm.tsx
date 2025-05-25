import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Room, Reservation, roomApi, reservationApi, formatDateForApi, ApiError } from '@/services/api';

// Map room types to display names
const roomTypeLabels = {
  STANDARD: 'Standard Room',
  DELUXE: 'Deluxe Room',
  SUITE: 'Suite',
  EXECUTIVE: 'Executive Suite'
};

const BookingForm = () => {
  const { toast } = useToast();
  
  // Form state
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [roomId, setRoomId] = useState<string>("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [datesSelected, setDatesSelected] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [fetchingRooms, setFetchingRooms] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch available rooms when both dates are selected
  useEffect(() => {
    if (checkIn && checkOut) {
      setDatesSelected(true);
      fetchAvailableRooms();
    } else {
      setDatesSelected(false);
      setAvailableRooms([]);
    }
  }, [checkIn, checkOut]);

  // Function to fetch available rooms with retry mechanism
  const fetchAvailableRooms = async (retryCount = 0, maxRetries = 2) => {
    if (!checkIn || !checkOut) return;
    
    setFetchingRooms(true);
    setFetchError(null);
    let isNetworkError = false;

    try {
      // Format dates for API
      const checkInStr = formatDateForApi(checkIn);
      const checkOutStr = formatDateForApi(checkOut);
      
      console.log('Fetching rooms for dates:', { checkInStr, checkOutStr });
      
      // First get all rooms
      const rooms = await roomApi.getAvailable(checkInStr, checkOutStr);
      console.log('Received rooms:', rooms);
      
      if (Array.isArray(rooms)) {
        setAvailableRooms(rooms);
        
        if (rooms.length === 0) {
          toast({
            title: "No rooms available",
            description: "There are no rooms available for the selected dates. Please try different dates.",
          });
        }
        
        // Clear room selection when available rooms change
        setRoomId("");
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error: any) {
      console.error('Error in fetchAvailableRooms:', error);
      
      let errorMessage = 'Failed to fetch available rooms. Please try again.';
      isNetworkError = !error.response && error.request;
      
      if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (isNetworkError) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Try to retry on network errors
      if (isNetworkError && retryCount < maxRetries) {
        console.log(`Network error, retrying (${retryCount + 1}/${maxRetries})...`);
        
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
        
        toast({
          title: "Connection issue",
          description: `Having trouble connecting to server. Retrying in ${delay/1000} seconds...`,
        });
        
        // Wait before retrying
        setTimeout(() => {
          fetchAvailableRooms(retryCount + 1, maxRetries);
        }, delay);
        
        return; // Exit early as we'll retry
      }
      
      setFetchError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      if (retryCount === maxRetries || !isNetworkError) {
        setFetchingRooms(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!checkIn || !checkOut) {
      toast({
        variant: "destructive",
        title: "Missing dates",
        description: "Please select check-in and check-out dates."
      });
      return;
    }
    
    if (checkIn >= checkOut) {
      toast({
        variant: "destructive",
        title: "Invalid date range",
        description: "Check-out date must be after check-in date."
      });
      return;
    }

    if (!roomId) {
      toast({
        variant: "destructive",
        title: "Room selection required",
        description: "Please select a room to book."
      });
      return;
    }
    
    if (!firstName || !lastName) {
      toast({
        variant: "destructive",
        title: "Missing name",
        description: "Please provide both first and last name."
      });
      return;
    }
    
    if (!email) {
      toast({
        variant: "destructive",
        title: "Missing email",
        description: "Please provide your email address."
      });
      return;
    }
    
    if (!phone) {
      toast({
        variant: "destructive",
        title: "Missing phone",
        description: "Please provide your phone number."
      });
      return;
    }

    // Check if total guest count exceeds room capacity
    const selectedRoom = availableRooms.find(room => room.id === parseInt(roomId));
    const totalGuests = parseInt(adults) + parseInt(children);
    if (selectedRoom && totalGuests > selectedRoom.capacity) {
      toast({
        variant: "destructive",
        title: "Too many guests",
        description: `This room has a maximum capacity of ${selectedRoom.capacity} guests. Please select a different room or reduce the number of guests.`
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Calculate total price
      const selectedRoom = availableRooms.find(room => room.id === parseInt(roomId));
      if (!selectedRoom) {
        throw new Error("Selected room not found");
      }
      
      // Create new Date objects for calculation to avoid modifying the original dates
      const checkInDate = new Date(checkIn);
      checkInDate.setHours(0, 0, 0, 0);
      const checkOutDate = new Date(checkOut);
      checkOutDate.setHours(0, 0, 0, 0);
      
      // Calculate number of nights
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      // Calculate total price - ensure price_per_night is a number
      const pricePerNight = typeof selectedRoom.price_per_night === 'string' 
        ? parseFloat(selectedRoom.price_per_night)
        : selectedRoom.price_per_night;
      
      const total_price = pricePerNight * nights;
      
      // Log calculation details
      console.log('Price calculation:', {
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        nights,
        pricePerNight,
        total_price
      });
      
      console.clear(); // Clear previous console output
      console.log('=== STARTING NEW RESERVATION SUBMISSION ===');
      
      // Create reservation object
      const reservationData: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'status'> = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        room: parseInt(roomId),
        check_in_date: formatDateForApi(checkIn),
        check_out_date: formatDateForApi(checkOut),
        number_of_guests: parseInt(adults) + parseInt(children),
        special_requests: specialRequests || undefined,
        total_price: total_price,
      };
      
      // Submit reservation to API
      // Log the reservation data and explicitly verify total_price is included
      console.log('Submitting reservation with data:', reservationData);
      console.log('Total price included:', reservationData.total_price);
      console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

      // Add a try-catch around the API call
      try {
        console.log('Attempting to create reservation with data:', reservationData);
        const result = await reservationApi.create(reservationData);
        console.log('Reservation created successfully:', result);
        
        toast({
          title: "Success!",
          description: "Your reservation has been submitted successfully.",
        });
        
        // Reset form
        setCheckIn(undefined);
        setCheckOut(undefined);
        setRoomId("");
        setAdults("1");
        setChildren("0");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setSpecialRequests("");
        setAvailableRooms([]);
        setDatesSelected(false);
      } catch (error: any) {
        console.error('Failed to create reservation:', error);
        
        let errorMessage = 'Failed to create reservation. Please try again.';
        if (error.response?.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (!error.response && error.request) {
          errorMessage = 'Network error. Please check your internet connection.';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        
        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: errorMessage,
        });
        
        throw error; // Re-throw to be caught by outer catch block
      }
      
    } catch (error) {
      // We already displayed a toast in the inner catch block
      console.error("Booking error:", error);
      
      // Check if form is already reset by inner try/catch
      if (checkIn !== undefined) {
        // Reset only necessary form fields if not already reset
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-hotel-dark mb-6">Book Your Stay</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date *
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : <span>Select check-in date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date *
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : <span>Select check-out date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                  disabled={(date) => 
                    date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                    (checkIn && date <= checkIn)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Room Selection and Guest Count */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-1">
              Available Rooms *
            </label>
            {fetchingRooms ? (
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading available rooms...</span>
              </div>
            ) : (
              <select
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
                disabled={!datesSelected || fetchingRooms}
                className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hotel-gold ${!datesSelected ? 'bg-gray-100' : ''}`}
              >
                <option value="">
                  {!datesSelected 
                    ? "Select dates first" 
                    : availableRooms.length === 0 
                      ? "No rooms available for selected dates" 
                      : "Select a room"}
                </option>
                {availableRooms.map((room) => {
                  const totalGuests = parseInt(adults) + parseInt(children);
                  const isOverCapacity = totalGuests > room.capacity;
                  
                  return (
                    <option 
                      key={room.id} 
                      value={room.id.toString()} 
                      disabled={isOverCapacity}
                    >
                      {roomTypeLabels[room.room_type]} {room.room_number} - KES {room.price_per_night}/night 
                      (Capacity: {room.capacity})
                      {isOverCapacity ? " - Too many guests" : ""}
                    </option>
                  );
                })}
              </select>
            )}
            {fetchError && (
              <div className="mt-1 flex items-center text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{fetchError}</span>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
              Adults *
            </label>
            <select
              id="adults"
              value={adults}
              onChange={(e) => {
                setAdults(e.target.value);
                // Force re-evaluation of room capacity constraints
              }}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hotel-gold"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Adult' : 'Adults'}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
              Children
            </label>
            <select
              id="children"
              value={children}
              onChange={(e) => {
                setChildren(e.target.value);
                // Force re-evaluation of room capacity constraints
              }}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hotel-gold"
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Child' : 'Children'}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hotel-gold"
              placeholder="First Name"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hotel-gold"
              placeholder="Last Name"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hotel-gold"
              placeholder="Your Email"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hotel-gold"
              placeholder="Your Phone Number"
            />
          </div>
        </div>
        
        {/* Special Requests */}
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hotel-gold"
            placeholder="Any special requests or requirements?"
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`hotel-btn w-full flex justify-center items-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Book Now'
          )}
        </button>
        
        {/* Confirmation note */}
        <p className="text-sm text-gray-600 text-center">
          * We'll send a confirmation to your email after reviewing your booking request.
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
