'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface PropertyItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  price: string;
  address: string;
  phone: string;
  image: string;
  images: string[];
  videos: string[];
  description: string;
  isAdminAdded?: boolean;
}

const STORAGE_KEY = 'xiaoxin_admin_';

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<PropertyItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    
    // Check if it's an admin-added item
    if (id && id.startsWith('admin-')) {
      const itemId = id.replace('admin-', '');
      try {
        const key = STORAGE_KEY + 'property';
        const data = localStorage.getItem(key);
        if (data) {
          const items = JSON.parse(data);
          const found = items.find((x: any) => x.id === itemId);
          if (found) {
            setItem({
              id: `admin-${found.id}`,
              name: found.data.name,
              category: found.data.category || '房产',
              rating: parseFloat(found.data.rating) || 4.5,
              price: found.data.price || '¥0/㎡',
              address: found.data.address || '',
              phone: found.data.phone || '',
              image: found.data.images && found.data.images.length > 0 ? found.data.images[0] : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
              images: found.data.images || [],
              videos: found.data.videos || [],
              description: found.data.description || '',
              isAdminAdded: true,
            });
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error('Error loading item:', e);
      }
    }
    
    // Default item not found - redirect back
    router.push('/property');
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center">
        <div className="text-[#E67E22]">加载中...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center">
        <div className="text-[#636E72] mb-4">未找到该房源</div>
        <Link href="/property" className="text-[#E67E22] hover:underline">
          返回房产列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#E67E22] to-[#D35400] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/property" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            ← 返回列表
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{item.name}</h1>
          <div className="flex items-center gap-4 text-white/80">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{item.category}</span>
            <span>⭐ {item.rating}</span>
            <span>💰 {item.price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Images */}
        {item.images && item.images.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              {item.images.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt={`${item.name} ${i + 1}`}
                  className="w-full h-64 object-cover rounded-xl"
                />
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {item.videos && item.videos.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#2D3436] mb-4">视频</h2>
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
          <h2 className="text-xl font-bold text-[#2D3436] mb-4">详细介绍</h2>
          <p className="text-[#636E72] leading-relaxed">{item.description || '暂无详细介绍'}</p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#2D3436] mb-4">联系方式</h2>
          {item.address && (
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#E67E22]">📍</span>
              <span className="text-[#636E72]">{item.address}</span>
            </div>
          )}
          {item.phone && (
            <div className="flex items-center gap-3">
              <span className="text-[#E67E22]">📞</span>
              <a href={`tel:${item.phone}`} className="text-[#E67E22] hover:underline">{item.phone}</a>
            </div>
          )}
          {!item.address && !item.phone && (
            <p className="text-[#636E72]">暂无联系方式</p>
          )}
        </div>
      </div>
    </div>
  );
}
