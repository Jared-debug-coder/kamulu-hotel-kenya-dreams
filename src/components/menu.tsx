import React from 'react';

const menuData = [
  {
    category: 'Breakfast',
    items: [
      {
        name: 'Kenyan Breakfast Platter',
        description: 'Eggs, sausage, mandazi, and chai.',
        image: '/Kenyan Breakfast Platter.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Omena & Ugali',
        description: 'Traditional lake fish with ugali and greens.',
        image: '/Omena & Ugali.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Pancakes & Fruit',
        description: 'Served with honey and seasonal fruit.',
        image: '/Pancakes & Fruit.jpg',
         price: 'Ksh 600',
      },
    ],
  },
  {
    category: 'Lunch',
    items: [
      {
        name: 'Nyama Choma Platter',
        description: 'Roasted beef or goat with kachumbari.',
        image: '/nyamachoma.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Chicken Biryani',
        description: 'Aromatic spiced rice with marinated chicken.',
        image: '/ChickenBiryani.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Tilapia Fillet',
        description: 'Grilled or fried with ugali and greens.',
        image: '/Tilapia Fillet.jpg',
         price: 'Ksh 600',
      },
    ],
  },
  {
    category: 'Dinner',
    items: [
      {
        name: 'Beef Stew & Chapati',
        description: 'Slow-cooked beef with soft chapatis.',
        image: '/Beef Stew & Chapati.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Vegetable Curry',
        description: 'Served with rice or chapati.',
        image: '/Vegetable Curry.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Grilled Chicken',
        description: 'With mashed potatoes and sautéed vegetables.',
        image: '/Grilled Chicken.jpg',
         price: 'Ksh 600',
      },
    ],
  },
  {
    category: 'Beverages',
    items: [
      {
        name: 'Fresh Passion Juice',
        description: 'Cold-pressed and refreshing.',
        image: '/Fresh Passion Juice.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Dawa',
        description: 'A hot drink made with honey, lemon, and ginger.',
        image: '/Dawa2.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Milkshake (Vanilla/Strawberry/Chocolate)',
        description: 'Thick and creamy milkshakes in multiple flavors.',
        image: '/Milkshake.jpg',
         price: 'Ksh 600',
      },
    ],
  },
  {
    category: 'Desserts',
    items: [
      {
        name: 'Chocolate Cake',
        description: 'Rich, moist chocolate cake with fudge icing.',
        image: '/Chocolate Cake.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Fruit Salad',
        description: 'Fresh mixed fruit topped with mint.',
        image: '/Fruit Salad.jpg',
         price: 'Ksh 600',
      },
      {
        name: 'Ice Cream (2 Scoops)',
        description: 'Choice of vanilla, strawberry, or chocolate.',
        image: '/Ice Cream.jpg',
         price: 'Ksh 600',
      },
    ],
  },
];

const Menu = () => {
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
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
