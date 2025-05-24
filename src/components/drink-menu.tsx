import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "../components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { orderApi } from '../services/orderApi';

interface DrinkItem {
  name: string;
  description: string;
  image: string;
  price: string;
}

interface DrinkCategory {
  category: string;
  items: DrinkItem[];
}

interface OrderData {
  itemName: string;
  category: string;
  price: string;
  quantity: number;
  notes: string;
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  paymentMethod: 'pay_now' | 'pay_on_delivery';
}

const drinkMenuData: DrinkCategory[] = [
  {
    category: 'Cocktails',
    items: [
      {
        name: 'Classic Mojito',
        description: 'White rum, mint, lime, sugar, and soda water.',
        image: '/Classic Mojito.jpg',
        price: 'Ksh 600', 
      },
      {
        name: 'Dawa',
        description: 'Vodka, honey, lime, and crushed ice.',
        image: '/Dawa.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Tequila Sunrise',
        description: 'Tequila, orange juice, grenadine syrup.',
        image: '/Tequila Sunrise.jpg',
         price: 'Ksh 600',
      },
    ],
  },
  {
    category: 'Wines',
    items: [
      {
        name: 'Chardonnay (Glass/Bottle)',
        description: 'Crisp white wine with hints of citrus.',
        image: '/Chardonnay.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Merlot (Glass/Bottle)',
        description: 'Smooth red wine with soft tannins.',
        image: '/Merlot.jpg',
         price: 'Ksh 600',
      },
    ],
  },
  {
    category: 'Spirits',
    items: [
      {
        name: 'Johnnie Walker Black Label',
        description: 'Rich, smoky Scotch whisky.',
        image: '/Johnnie Walker Black Label.webp',
         price: 'Ksh 600',
      },
      {
        name: 'Tanqueray Gin',
        description: 'London dry gin with strong juniper notes.',
        image: '/Tanqueray Gin.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Hennessy VS',
        description: 'Smooth Cognac with vanilla and oak.',
        image: '/Hennessy VS.jpg',
         price: 'Ksh 600',
      },
    ],
  },
  {
    category: 'Beers',
    items: [
      {
        name: 'Tusker Lager',
        description: 'Kenya’s classic lager.',
        image: '/Tusker Lager.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'White Cap Lager',
        description: 'Smooth and refreshing lager.',
        image: '/White Cap Lager.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Heineken',
        description: 'Premium imported lager.',
        image: '/Heineken.jpg',
         price: 'Ksh 600',
      },
    ],
  },
  {
    category: 'Non-Alcoholic',
    items: [
      {
        name: 'Mocktail Punch',
        description: 'Fruity blend of tropical juices.',
        image: '/Mocktail Punch.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Fresh Juice',
        description: 'Choice of mango, pineapple, passion.',
        image: '/Fresh Juice.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Soft Drinks',
        description: 'Coca-Cola, Fanta, Sprite, Stoney.',
        image: '/Soft Drinks.jpg',
         price: 'Ksh 600',
      },
    ],
  },
  {
    category: 'Light Bites',
    items: [
      {
        name: 'Spicy Chicken Wings',
        description: 'Served with garlic aioli.',
        image: '/Spicy Chicken Wings.webp',
         price: 'Ksh 600',
      },
      {
        name: 'Loaded Fries',
        description: 'Topped with cheese, bacon & jalapeños.',
        image: '/Loaded Fries.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Beef Samosas',
        description: 'Handmade and served with chutney.',
        image: '/Beef Samosas.jpg',
         price: 'Ksh 600',
      },
    ],
  },
];

const DrinkMenu = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{item: DrinkItem, category: string} | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pay_now' | 'pay_on_delivery'>('pay_on_delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    customerName?: string;
    phoneNumber?: string;
    deliveryAddress?: string;
  }>({});

  const handleOrderClick = (item: DrinkItem, category: string) => {
    setSelectedItem({ item, category });
    setQuantity(1);
    setNotes('');
    setCustomerName('');
    setPhoneNumber('');
    setDeliveryAddress('');
    setPaymentMethod('pay_on_delivery');
    setFormErrors({});
    setIsOrderModalOpen(true);
  };
  
  const validateForm = () => {
    const errors: {
      customerName?: string;
      phoneNumber?: string;
      deliveryAddress?: string;
    } = {};
    
    if (!customerName.trim()) {
      errors.customerName = 'Name is required';
    }
    
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^(?:\+254|0)[17]\d{8}$/.test(phoneNumber.trim())) {
      errors.phoneNumber = 'Please enter a valid Kenyan phone number';
    }
    
    if (!deliveryAddress.trim()) {
      errors.deliveryAddress = 'Delivery address is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderSubmit = async () => {
    if (!selectedItem) return;
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const orderData = {
      itemName: selectedItem.item.name,
      category: selectedItem.category,
      price: selectedItem.item.price,
      quantity,
      notes,
      customerName,
      phoneNumber,
      deliveryAddress,
      paymentMethod
    };
    
    try {
      await orderApi.submitOrder(orderData);
      toast({
        title: "Order Submitted",
        description: `Your order for ${quantity} ${selectedItem.item.name} has been received.`,
      });
      setIsOrderModalOpen(false);
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error submitting your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800"></h1>

      {drinkMenuData.map((section) => (
        <div key={section.category} className="mb-12">
          <h2 className="text-3xl font-semibold text-hotel-gold border-b border-hotel-gold pb-2 mb-6">{section.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {section.items.map((item, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />
                {item.price && (
                  <span className="absolute top-2 right-2 bg-white bg-opacity-80 text-blue-600 font-bold px-3 py-1 rounded shadow">
                    {item.price}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <button 
                  onClick={() => handleOrderClick(item, section.category)}
                  className="mt-3 px-4 py-2 bg-hotel-gold text-white rounded-md hover:bg-blue-600 transition-colors w-full"
                >
                  Order Online
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      ))}

      {/* Order Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedItem.item.image} 
                  alt={selectedItem.item.name} 
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-bold">{selectedItem.item.name}</h3>
                  <p className="text-sm text-gray-500">{selectedItem.category}</p>
                  <p className="text-sm font-semibold text-blue-600">{selectedItem.item.price}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid gap-4 py-4 border-t pt-4 mt-2">
                <h4 className="font-semibold text-lg">Customer Information</h4>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customerName" className="text-right">
                    Name*
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={formErrors.customerName ? "border-red-500" : ""}
                    />
                    {formErrors.customerName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.customerName}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Phone*
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g., 0712345678"
                      className={formErrors.phoneNumber ? "border-red-500" : ""}
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deliveryAddress" className="text-right">
                    Address*
                  </Label>
                  <div className="col-span-3">
                    <Textarea
                      id="deliveryAddress"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Delivery address"
                      className={formErrors.deliveryAddress ? "border-red-500" : ""}
                    />
                    {formErrors.deliveryAddress && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.deliveryAddress}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Payment
                  </Label>
                  <div className="col-span-3">
                    <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'pay_now' | 'pay_on_delivery')}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pay_now" id="payNow" />
                        <Label htmlFor="payNow">Pay Now</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pay_on_delivery" id="payOnDelivery" />
                        <Label htmlFor="payOnDelivery">Pay on Delivery</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleOrderSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Place Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DrinkMenu;
