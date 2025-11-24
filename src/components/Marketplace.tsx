import { Coins, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Marketplace() {
  const navigate = useNavigate();
  const [coins] = useState(1250);
  const [filter, setFilter] = useState<'all' | 'hats' | 'outfits'>('all');

  const items = [
    {
      id: 1,
      name: 'Pharaoh Crown',
      category: 'hats',
      price: 500,
      rarity: 'legendary',
      emoji: '👑',
    },
    {
      id: 2,
      name: 'Explorer Hat',
      category: 'hats',
      price: 150,
      rarity: 'common',
      emoji: '🎩',
    },
    {
      id: 3,
      name: 'Golden Headdress',
      category: 'hats',
      price: 400,
      rarity: 'rare',
      emoji: '🪶',
    },
    {
      id: 4,
      name: 'Archaeologist Outfit',
      category: 'outfits',
      price: 600,
      rarity: 'rare',
      emoji: '🧥',
    },
    {
      id: 5,
      name: 'Royal Robe',
      category: 'outfits',
      price: 800,
      rarity: 'legendary',
      emoji: '👘',
    },
    {
      id: 6,
      name: 'Student Uniform',
      category: 'outfits',
      price: 100,
      rarity: 'common',
      emoji: '👕',
    },
    {
      id: 7,
      name: 'Sphinx Hat',
      category: 'hats',
      price: 300,
      rarity: 'rare',
      emoji: '🦁',
    },
    {
      id: 8,
      name: 'Desert Explorer',
      category: 'outfits',
      price: 450,
      rarity: 'rare',
      emoji: '🏜️',
    },
    {
      id: 9,
      name: 'Scarab Crown',
      category: 'hats',
      price: 350,
      rarity: 'rare',
      emoji: '🪲',
    },
  ];

  const filteredItems = items.filter(item => filter === 'all' || item.category === filter);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#a33013';
      case 'rare': return '#e17624';
      case 'common': return '#2cc75c';
      default: return '#gray';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[#a33013] mb-2">Avatar Marketplace</h1>
              <p className="text-[#a33013]/90 text-xl">Customize your explorer with coins you've earned!</p>
            </div>
            <div className="bg-gradient-to-r from-[#e17624] to-[#a33013] text-white px-8 py-4 rounded-xl flex items-center gap-3">
              <Coins className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Your Coins</p>
                <p className="text-2xl">{coins.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-xl transition-colors ${filter === 'all'
                  ? 'bg-[#e17624] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All Items
              </button>
              <button
                onClick={() => setFilter('hats')}
                className={`px-6 py-3 rounded-xl transition-colors ${filter === 'hats'
                  ? 'bg-[#e17624] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Hats
              </button>
              <button
                onClick={() => setFilter('outfits')}
                className={`px-6 py-3 rounded-xl transition-colors ${filter === 'outfits'
                  ? 'bg-[#e17624] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Outfits
              </button>
            </div>
            <div className="text-gray-600">
              Showing {filteredItems.length} items
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const canAfford = coins >= item.price;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="h-40 flex items-center justify-center relative"
                  style={{ backgroundColor: `${getRarityColor(item.rarity)}15` }}
                >
                  <div className="text-7xl">{item.emoji}</div>
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs capitalize"
                    style={{ backgroundColor: getRarityColor(item.rarity) }}
                  >
                    {item.rarity}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2">{item.name}</h3>
                  {/* <div className="flex items-center gap-2 mb-4">
                    <Coins className="w-5 h-5 text-[#e17624]" />
                    <span className="text-[#a33013]">{item.price} coins</span>
                  </div> */}

                  <button
                    disabled={!canAfford}
                    className={`w-full py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${canAfford
                      ? 'bg-[#e17624] text-white hover:bg-[#c96520]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {canAfford ? `${item.price} coins` : 'Not Enough Coins'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Earn More CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#a33013] to-[#e17624] rounded-2xl p-8 text-white text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-white mb-4">Need More Coins?</h2>
          <p className="text-white/90 mb-6 text-lg">
            Complete lessons, finish quizzes, and conquer daily quests to earn more coins!
          </p>
          <button
            onClick={() => navigate('/student-dashboard')}
            className="bg-white text-[#2cc75c] px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Star className="w-5 h-5" />
            Start Earning
          </button>
        </div>
      </div>
    </div>
  );
}
