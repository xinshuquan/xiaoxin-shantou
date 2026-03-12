'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { homeServiceData, categories } from '@/lib/data';

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

export default function HomeServicePage() {
  const category = categories[5];
  const categories_list = ['全部', '家政', '保洁', '维修', '搬家', '月嫂'];
  const [adminData, setAdminData] = useState<AdminItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  const loadData = () => {
    try {
      const items = getAllFromStorage('home-service');
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
      category: item.data.category || '家政',
      rating: parseFloat(item.data.rating) || 4.5,
      price: item.data.price || '¥0',
      address: item.data.address || '',
      phone: item.data.phone || '',
      image: item.data.images && item.data.images.length > 0 ? item.data.images[0] : 'https://images.unsplash.com/photo-1581578731548-c64695b69535?w=800',
      images: item.data.images || [],
      videos: item.data.videos || [],
      description: item.data.description || '',
      isAdminAdded: true,
    })),
    ...homeServiceData.map(item => ({ ...item, isAdminAdded: false })),
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <div className="bg-gradient-to-r from-[#1ABC9C] to-[#16A085] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl font-bold text-white mb-3 font-serif">{category.name}</h1>
          <p className="text-white/80 text-lg">{category.description}</p>
        </div>
      </div>

      <div className="bg-white border-b border-[#E8E8E8] sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories_list.map((cat) => (
              <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === '全部' ? 'bg-[#1ABC9C] text-white' : 'bg-[#F5F5F5] text-[#636E72] hover:bg-[#1ABC9C]/10 hover:text-[#1ABC9C]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {isClient && adminData.length > 0 && (
          <div className="mb-4 p-3 bg-[#1ABC9C]/10 border border-[#1ABC9C]/30 rounded-xl">
            <span className="text-[#1ABC9C] text-sm">后台新增了 {adminData.length} 条内容</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allData.map((item: any) => (
            <Link key={item.id} href={item.isAdminAdded ? `/home-service/admin-${item.id}` : `/home-service/${item.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#1ABC9C] text-white text-xs rounded-full">{item.category}</div>
                {item.isAdminAdded && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-[#E91E63] text-white text-xs font-bold rounded-full">新增</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#2D3436] mb-2 group-hover:text-[#1ABC9C] transition-colors">{item.name}</h3>
                <p className="text-sm text-[#636E72] mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E8]">
                  <span className="text-[#1ABC9C] font-bold">{item.price}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <svg className="w-4 h-4 text-[#FFB800] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <span className="font-medium">{item.rating}</span>
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
