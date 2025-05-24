import React from 'react';

const drinkMenuData = [
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
              </div>
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrinkMenu;
