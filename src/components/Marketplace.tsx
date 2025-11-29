import { Coins, ShoppingBag, Star, Sparkles, Check, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface MarketplaceItem {
  id: number;
  name: string;
  category: 'hats' | 'outfits';
  price: number;
  rarity: 'legendary' | 'rare' | 'common';
  emoji: string;
}

export function Marketplace() {
  const navigate = useNavigate();

  // Load coins from sessionStorage or default to 1250
  const [coins, setCoins] = useState(() => {
    const savedCoins = sessionStorage.getItem('userCoins');
    return savedCoins ? parseInt(savedCoins, 10) : 1250;
  });

  // Load owned items from sessionStorage or default to empty array
  const [ownedItems, setOwnedItems] = useState<number[]>(() => {
    const savedOwned = sessionStorage.getItem('ownedItems');
    return savedOwned ? JSON.parse(savedOwned) : [];
  });

  const [filter, setFilter] = useState<'all' | 'hats' | 'outfits' | 'owned'>('all');
  const [purchaseAnimation, setPurchaseAnimation] = useState<number | null>(null);

  // Save coins to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('userCoins', coins.toString());
  }, [coins]);

  // Save owned items to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('ownedItems', JSON.stringify(ownedItems));
  }, [ownedItems]);

  const items: MarketplaceItem[] = [
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

  const handlePurchase = (item: MarketplaceItem) => {
    if (coins >= item.price && !ownedItems.includes(item.id)) {
      // Deduct coins
      setCoins(coins - item.price);
      // Add to owned items
      setOwnedItems([...ownedItems, item.id]);
      // Show purchase animation
      setPurchaseAnimation(item.id);
      setTimeout(() => setPurchaseAnimation(null), 2000);
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'owned') {
      return ownedItems.includes(item.id);
    }
    return filter === 'all' || item.category === filter;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#a33013';
      case 'rare': return '#e17624';
      case 'common': return '#2cc75c';
      default: return '#gray';
    }
  };

  const isOwned = (itemId: number) => ownedItems.includes(itemId);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#a33013] mb-2">Avatar Marketplace</h1>
              <p className="text-[#a33013]/90 text-xl">Customize your explorer with coins you've earned!</p>
            </div>
            <div className="bg-gradient-to-r from-[#e17624] to-[#a33013] text-white px-8 py-4 rounded-xl flex items-center gap-3">
              <Coins className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Your Coins</p>
                <p className="text-3xl font-bold">{coins.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2cc75c]/20 rounded-xl flex items-center justify-center">
                <Package className="w-7 h-7 text-[#2cc75c]" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Items Owned</p>
                <p className="text-2xl font-bold text-gray-900">{ownedItems.length} / {items.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#e17624]/20 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#e17624]" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Available Items</p>
                <p className="text-2xl font-bold text-gray-900">{items.length - ownedItems.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#a33013]/20 rounded-xl flex items-center justify-center">
                <Star className="w-7 h-7 text-[#a33013]" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Collection Progress</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round((ownedItems.length / items.length) * 100)}%</p>
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
                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${filter === 'all'
                  ? 'bg-[#e17624] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All Items
              </button>
              <button
                onClick={() => setFilter('hats')}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${filter === 'hats'
                  ? 'bg-[#e17624] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Hats
              </button>
              <button
                onClick={() => setFilter('outfits')}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${filter === 'outfits'
                  ? 'bg-[#e17624] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Outfits
              </button>
              <button
                onClick={() => setFilter('owned')}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 ${filter === 'owned'
                  ? 'bg-[#2cc75c] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Check className="w-5 h-5" />
                Owned ({ownedItems.length})
              </button>
            </div>
            <div className="text-gray-600 font-medium">
              Showing {filteredItems.length} items
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Items Yet</h3>
            <p className="text-gray-500">
              {filter === 'owned'
                ? "You haven't purchased any items yet. Start shopping to build your collection!"
                : "No items match your filter."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const canAfford = coins >= item.price;
              const owned = isOwned(item.id);
              const showAnimation = purchaseAnimation === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${showAnimation ? 'scale-105 ring-4 ring-[#2cc75c]' : ''
                    }`}
                >
                  <div
                    className="h-40 flex items-center justify-center relative"
                    style={{ backgroundColor: `${getRarityColor(item.rarity)}15` }}
                  >
                    <div className="text-7xl">{item.emoji}</div>
                    <div
                      className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-semibold capitalize"
                      style={{ backgroundColor: getRarityColor(item.rarity) }}
                    >
                      {item.rarity}
                    </div>
                    {owned && (
                      <div className="absolute top-3 left-3 bg-[#2cc75c] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Owned
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{item.name}</h3>

                    {owned ? (
                      <button
                        disabled
                        className="w-full py-3 rounded-xl bg-[#2cc75c] text-white font-semibold flex items-center justify-center gap-2 cursor-default"
                      >
                        <Check className="w-5 h-5" />
                        Owned
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford}
                        className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${canAfford
                          ? 'bg-[#e17624] text-white hover:bg-[#c96520] hover:scale-105'
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
        )}

        {/* Earn More CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#a33013] to-[#e17624] rounded-2xl p-8 text-white text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-[#e17624]" />
          <h2 className="text-3xl font-bold text-[#e17624] mb-4">Need More Coins?</h2>
          <p className="text-white/90 mb-6 text-lg">
            Complete lessons, finish quizzes, and conquer daily quests to earn more coins!
          </p>
          <button
            onClick={() => navigate('/student-dashboard')}
            className="bg-white text-[#a33013] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Star className="w-5 h-5" />
            Start Earning
          </button>
        </div>
      </div>
    </div>
  );
}
