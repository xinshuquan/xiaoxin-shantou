'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { nightlifeData, categories } from '@/lib/data';

interface AdminItem {
  id: string;
  moduleId: string;
  data: {
    name: string;
    category: string;
    description: string;
    price: string;
    rating: string;
    images: string[];
    videos: string[];
    address: string;
    phone: string;
  };
  timestamp: string;
}

const STORAGE_KEY = 'xiaoxin_admin_';

const getAllFromStorage = (moduleId: string): AdminItem[] => {
  try {
    const key = STORAGE_KEY + moduleId;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export default function NightlifePage() {
  const category = categories[1];
  const categories_list = ['全部', '酒吧', 'KTV', '清吧', '夜总会', 'livehouse'];
  const [adminData, setAdminData] = useState<AdminItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  const loadData = () => {
    try {
      const items = getAllFromStorage('nightlife');
      setAdminData(items);
      setIsClient(true);
    } catch (e) {
      console.error('Error loading data:', e);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const allData = [
    ...adminData.map((item) => ({
      id: item.id,
      name: item.data.name,
      category: item.data.category || '夜店',
      rating: parseFloat(item.data.rating) || 4.5,
      price: item.data.price || '¥0',
      address: item.data.address || '',
      phone: item.data.phone || '',
      image: item.data.images && item.data.images.length > 0 ? item.data.images[0] : 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      images: item.data.images || [],
      videos: item.data.videos || [],
      description: item.data.description || '',
      hours: '20:00-02:00',
      isAdminAdded: true,
    })),
    ...nightlifeData.map(item => ({ ...item, isAdminAdded: false })),
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="bg-gradient-to-r from-[#FFD700] to-[#D4AF37] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4 filter hue-rotate-30">{category.icon}</div>
          <h1 className="text-4xl font-bold text-[#0D0D0D] mb-3 font-serif">{category.name}</h1>
          <p className="text-[#0D0D0D]/80 text-lg">{category.description}</p>
        </div>
      </div>

      <div className="bg-[#141414] border-b border-[#2D2D2D] sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories_list.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === '全部' ? 'bg-[#FFD700] text-[#0D0D0D]' : 'bg-[#1F1F1F] text-[#8B7355] hover:bg-[#FFD700]/20 hover:text-[#FFD700] border border-[#3D3D3D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {isClient && adminData.length > 0 && (
          <div className="mb-4 p-3 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-xl">
            <span className="text-[#FFD700] text-sm">后台新增了 {adminData.length} 条内容</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allData.map((item: any) => (
            <Link
              key={item.id}
              href={item.isAdminAdded ? `/nightlife/admin-${item.id}` : `/nightlife/${item.id}`}
              className="group bg-[#141414] rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300 border border-[#2D2D2D]"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#FFD700] text-[#0D0D0D] text-xs font-bold rounded-full">{item.category}</div>
                {item.isAdminAdded && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-[#E91E63] text-white text-xs font-bold rounded-full">新增</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#FFD700] mb-2 group-hover:text-[#FFE44D] transition-colors">{item.name}</h3>
                <p className="text-[#8B7355] text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFD700] font-bold">{item.price}</span>
                  <div className="flex items-center gap-1 text-sm text-[#8B7355]">
                    <span>⭐</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
