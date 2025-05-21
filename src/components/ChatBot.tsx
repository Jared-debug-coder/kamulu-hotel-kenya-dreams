
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Kamulu Waters Hotel. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('booking') || input.includes('reservation') || input.includes('book')) {
      return "You can make a reservation by visiting our Reservation page or calling us at +254 712 345 678. Would you like me to provide more information about our rooms?";
    } else if (input.includes('room') || input.includes('accommodation')) {
      return "We offer various room types including Deluxe Rooms, Family Rooms, and Executive Suites. Each room is equipped with modern amenities for your comfort. Would you like specific details about any room type?";
    } else if (input.includes('price') || input.includes('cost') || input.includes('rate')) {
      return "Our room rates start from Ksh 5,000 per night, depending on the room type and season. For exact pricing, please check our Reservation page or contact our front desk.";
    } else if (input.includes('location') || input.includes('address') || input.includes('direction')) {
      return "We are located in Kamulu, Kasarani Constituency, Nairobi, Kenya. You can find detailed directions on our Contact page.";
    } else if (input.includes('check-in') || input.includes('check out')) {
      return "Our standard check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in or late check-out can be arranged based on availability.";
    } else if (input.includes('amenities') || input.includes('facilities')) {
      return "We offer various amenities including a swimming pool, restaurant, bar, spa, fitness center, conference facilities, and free Wi-Fi throughout the property.";
    } else if (input.includes('contact') || input.includes('phone') || input.includes('email')) {
      return "You can contact us at +254 712 345 678 or email us at info@kamuluwatershotel.co.ke. Our front desk is available 24/7 to assist you.";
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! How can I help you with Kamulu Waters Hotel today?";
    } else if (input.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (input.includes('bye') || input.includes('goodbye')) {
      return "Thank you for chatting with us. Have a great day! Feel free to return if you have more questions.";
    } else {
      return "Thank you for your message. If you have specific questions about our hotel, rooms, amenities, or booking process, please let me know and I'll be happy to assist you.";
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={toggleChat} 
        className="fixed bottom-6 right-6 z-50 bg-hotel-gold text-white p-4 rounded-full shadow-lg hover:bg-hotel-accent transition-colors duration-300"
        aria-label="Chat with us"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 md:w-96 bg-white rounded-lg shadow-xl flex flex-col">
          <div className="bg-hotel-gold text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className="mr-2" size={20} />
              <span className="font-semibold">Kamulu Waters Hotel</span>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto max-h-96 min-h-[300px]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-hotel-gold text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          
          <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 flex">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-hotel-gold"
            />
            <Button 
              type="submit" 
              className="bg-hotel-gold hover:bg-hotel-accent text-white rounded-r-md"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
