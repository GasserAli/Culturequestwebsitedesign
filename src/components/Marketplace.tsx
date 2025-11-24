import { Coins, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Marketplace() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(1250);
  const [filter, setFilter] = useState<'all' | 'hats' | 'outfits' | 'owned'>('all');

  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Pharaoh Crown',
      category: 'hats',
      price: 500,
      rarity: 'legendary',
      emoji: '👑',
      owned: false,
    },
    {
      id: 2,
      name: 'Explorer Hat',
      category: 'hats',
      price: 150,
      rarity: 'common',
      emoji: '🎩',
      owned: true,
    },
    {
      id: 3,
      name: 'Golden Headdress',
      category: 'hats',
      price: 400,
      rarity: 'rare',
      emoji: '🪶',
      owned: false,
    },
    {
      id: 4,
      name: 'Archaeologist Outfit',
      category: 'outfits',
      price: 600,
      rarity: 'rare',
      emoji: '🧥',
      owned: true,
    },
    {
      id: 5,
      name: 'Royal Robe',
      category: 'outfits',
      price: 800,
      rarity: 'legendary',
      emoji: '👘',
      owned: false,
    },
    {
      id: 6,
      name: 'Student Uniform',
      category: 'outfits',
      price: 100,
      rarity: 'common',
      emoji: '👕',
      owned: true,
    },
    {
      id: 7,
      name: 'Sphinx Hat',
      category: 'hats',
      price: 300,
      rarity: 'rare',
      emoji: '🦁',
      owned: false,
    },
    {
      id: 8,
      name: 'Desert Explorer',
      category: 'outfits',
      price: 450,
      rarity: 'rare',
      emoji: '🏜️',
      owned: false,
    },
    {
      id: 9,
      name: 'Scarab Crown',
      category: 'hats',
      price: 350,
      rarity: 'rare',
      emoji: '🪲',
      owned: false,
    },
  ]);

  const handlePurchase = (itemId: number, price: number) => {
    if (coins >= price) {
      setCoins(prev => prev - price);
      setItems(prev => prev.map(item =>
        item.id === itemId ? { ...item, owned: true } : item
      ));
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'owned') return item.owned;
    if (filter === 'all') return true;
    return item.category === filter;
  });

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
              {['all', 'hats', 'outfits', 'owned'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-6 py-3 rounded-xl transition-colors capitalize ${filter === f
                    ? 'bg-[#e17624] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {f === 'owned' ? 'My Items' : f === 'all' ? 'All Items' : f}
                </button>
              ))}
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
                  {item.owned && (
                    <div className="absolute top-3 left-3 bg-[#2cc75c] text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Owned
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="mb-2">{item.name}</h3>

                  {item.owned ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-gray-100 text-gray-500 font-bold cursor-default flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Owned
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchase(item.id, item.price)}
                      disabled={!canAfford}
                      className={`w-full py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${canAfford
                        ? 'bg-[#e17624] text-white hover:bg-[#c96520]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      {canAfford ? `${item.price} coins` : 'Not Enough Coins'}
                    </button>
                  )}
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
