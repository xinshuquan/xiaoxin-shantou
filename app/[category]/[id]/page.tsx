'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface DetailItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string;  // 热门推荐、最新上线
  rating: number;
  price: string;
  address: string;
  phone: string;
  image: string;
  images: string[];
  videos: string[];
  description: string;
}

const STORAGE_KEYS: Record<string, string> = {
  'nightlife': 'xiaoxin_admin_nightlife',
  'stay': 'xiaoxin_admin_stay',
  'travel': 'xiaoxin_admin_travel',
  'home-service': 'xiaoxin_admin_home-service',
  'jobs': 'xiaoxin_admin_jobs',
  'wellness': 'xiaoxin_admin_wellness',
  'pet': 'xiaoxin_admin_pet',
};

const MODULE_NAMES: Record<string, string> = {
  'nightlife': '夜店',
  'stay': '民宿',
  'travel': '旅游',
  'home-service': '家政',
  'jobs': '招聘',
  'wellness': '养生',
  'pet': '宠物',
};

const COLORS: Record<string, string> = {
  'nightlife': '#FFD700',
  'stay': '#3498DB',
  'travel': '#2ECC71',
  'home-service': '#1ABC9C',
  'jobs': '#34495E',
  'wellness': '#E91E63',
  'pet': '#9C27B0',
};

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<DetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const moduleId = params.id as string;
    const module = moduleId?.split('/')[0];
    
    if (!module || !STORAGE_KEYS[module]) {
      setLoading(false);
      return;
    }

    // Get the item ID from URL
    const pathParts = moduleId.split('/');
    const id = pathParts[pathParts.length - 1];
    const itemId = id.startsWith('admin-') ? id.replace('admin-', '') : id;

    try {
      const key = STORAGE_KEYS[module];
      const data = localStorage.getItem(key);
      if (data) {
        const items = JSON.parse(data);
        const found = items.find((x: any) => x.id === itemId);
        if (found) {
          setItem({
            id: `admin-${found.id}`,
            name: found.data.name,
            category: found.data.category || MODULE_NAMES[module],
            subCategory: found.data.subCategory || '',  // 热门推荐、最新上线
            rating: parseFloat(found.data.rating) || 4.5,
            price: found.data.price || '¥0',
            address: found.data.address || '',
            phone: found.data.phone || '',
            image: found.data.images && found.data.images.length > 0 ? found.data.images[0] : '',
            images: found.data.images || [],
            videos: found.data.videos || [],
            description: found.data.description || '',
          });
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error('Error loading item:', e);
    }
    
    router.push(`/${module}`);
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-gray-500 mb-4">未找到该内容</div>
        <button onClick={() => router.back()} className="text-blue-500 hover:underline">
          返回
        </button>
      </div>
    );
  }

  const color = COLORS[params.id?.toString().split('/')[0] || 'nightlife'] || '#FFD700';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img 
            src={selectedImage} 
            alt="放大图片" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r" style={{ backgroundColor: color }}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button 
            onClick={() => router.back()} 
            className="inline-flex items-center text-white/80 hover:text-white mb-4"
          >
            ← 返回列表
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">{item.name}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
              {item.category}
            </span>
            {item.subCategory && (
              <span className="px-3 py-1 bg-red-500 rounded-full text-sm text-white font-bold">
                {item.subCategory}
              </span>
            )}
            <span className="text-white/80">⭐ {item.rating}</span>
            <span className="text-white/80">💰 {item.price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Images */}
        {item.images && item.images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">图片展示</h2>
            <div className="grid grid-cols-2 gap-4">
              {item.images.map((img, i) => (
                <img 
                  key={i}
                  src={img}
                  alt={`${item.name} ${i + 1}`}
                  className="w-full h-48 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {item.videos && item.videos.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">视频</h2>
            <div className="grid grid-cols-1 gap-4">
              {item.videos.map((video, i) => (
                <video 
                  key={i}
                  src={video}
                  controls
                  className="w-full rounded-xl"
                />
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">详细介绍</h2>
          <p className="text-gray-600 leading-relaxed">{item.description || '暂无详细介绍'}</p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">联系方式</h2>
          {item.address && (
            <div className="flex items-center gap-3 mb-3">
              <span style={{ color }}>📍</span>
              <span className="text-gray-600">{item.address}</span>
            </div>
          )}
          {item.phone && (
            <div className="flex items-center gap-3">
              <span style={{ color }}>📞</span>
              <a href={`tel:${item.phone}`} style={{ color }} className="hover:underline">{item.phone}</a>
            </div>
          )}
          {!item.address && !item.phone && (
            <p className="text-gray-500">暂无联系方式</p>
          )}
        </div>
      </div>
    </div>
  );
}
