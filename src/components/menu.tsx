import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "../components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { orderApi } from '../services/orderApi';
import { getImageUrl } from '@/lib/utils';

interface MenuItem {
  name: string;
  description: string;
  image: string;
  price: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
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

const menuData: MenuCategory[] = [
    {
      category: 'Breakfast',
      items: [
        {
          name: 'Kenyan Breakfast Platter',
          description: 'Eggs, sausage, mandazi, and chai.',
          image: getImageUrl('Kenyan Breakfast Platter.jpg'),
         price: 'Ksh 450',
      },
      {
          name: 'Omena & Ugali',
          description: 'Traditional lake fish with ugali and greens.',
          image: getImageUrl('Omena & Ugali.jpg'),
         price: 'Ksh 350',
      },
      {
          name: 'Pancakes & Fruit',
          description: 'Served with honey and seasonal fruit.',
          image: getImageUrl('Pancakes & Fruit.jpg'),
         price: 'Ksh 400',
      },
    ],
  },
  {
    category: 'Lunch',
    items: [
      {
          name: 'Nyama Choma Platter',
          description: 'Roasted beef or goat with kachumbari.',
          image: getImageUrl('nyamachoma.jpg'),
         price: 'Ksh 850',
      },
      {
          name: 'Chicken Biryani',
          description: 'Aromatic spiced rice with marinated chicken.',
          image: getImageUrl('ChickenBiryani.jpg'),
         price: 'Ksh 650',
      },
      {
          name: 'Tilapia Fillet',
          description: 'Grilled or fried with ugali and greens.',
          image: getImageUrl('Tilapia Fillet.jpg'),
         price: 'Ksh 750',
      },
    ],
  },
  {
    category: 'Dinner',
    items: [
      {
          name: 'Beef Stew & Chapati',
          description: 'Slow-cooked beef with soft chapatis.',
          image: getImageUrl('Beef Stew & Chapati.jpg'),
         price: 'Ksh 550',
      },
      {
          name: 'Vegetable Curry',
          description: 'Served with rice or chapati.',
          image: getImageUrl('Vegetable Curry.jpg'),
         price: 'Ksh 450',
      },
      {
          name: 'Grilled Chicken',
          description: 'With mashed potatoes and sautéed vegetables.',
          image: getImageUrl('Grilled Chicken.jpg'),
         price: 'Ksh 700',
      },
    ],
  },
  {
    category: 'Beverages',
    items: [
      {
          name: 'Fresh Passion Juice',
          description: 'Cold-pressed and refreshing.',
          image: getImageUrl('Fresh Passion Juice.jpg'),
         price: 'Ksh 200',
      },
      {
          name: 'Dawa',
          description: 'A hot drink made with honey, lemon, and ginger.',
          image: getImageUrl('Dawa2.jpg'),
         price: 'Ksh 250',
      },
      {
          name: 'Milkshake (Vanilla/Strawberry/Chocolate)',
          description: 'Thick and creamy milkshakes in multiple flavors.',
          image: getImageUrl('Milkshake.jpg'),
         price: 'Ksh 300',
      },
    ],
  },
  {
    category: 'Desserts',
    items: [
      {
          name: 'Chocolate Cake',
          description: 'Rich, moist chocolate cake with fudge icing.',
          image: getImageUrl('Chocolate Cake.jpg'),
         price: 'Ksh 350',
      },
      {
          name: 'Fruit Salad',
          description: 'Fresh mixed fruit topped with mint.',
          image: getImageUrl('Fruit Salad.jpg'),
         price: 'Ksh 250',
      },
      {
          name: 'Ice Cream (2 Scoops)',
          description: 'Choice of vanilla, strawberry, or chocolate.',
          image: getImageUrl('Ice Cream.jpg'),
         price: 'Ksh 300',
      },
    ],
  },
];

const Menu = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{item: MenuItem, category: string} | null>(null);
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

  const handleOrderClick = (item: MenuItem, category: string) => {
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

      {menuData.map((section) => (
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

export default Menu;
