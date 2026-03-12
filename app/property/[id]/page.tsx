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
  wechatPay: string;
  alipay: string;
}

const STORAGE_KEY = 'xiaoxin_admin_';

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<PropertyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat');

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
              wechatPay: found.data.wechatPay || '',
              alipay: found.data.alipay || '',
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
            <h2 className="text-xl font-bold text-[#2D3436] mb-4">图片展示</h2>
            <div className="grid grid-cols-2 gap-4">
              {item.images.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt={`${item.name} ${i + 1}`}
                  className="w-full h-64 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(img)}
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
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
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

        {/* Order Button */}
        {(item.wechatPay || item.alipay) && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm">价格</div>
                <div className="text-2xl font-bold text-gray-800">{item.price}</div>
              </div>
              <button 
                onClick={() => setShowOrderModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white rounded-xl font-bold text-lg"
              >
                🎫 下单购买
              </button>
            </div>
          </div>
        )}

        {/* Order Modal */}
        {showOrderModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">确认订单</h3>
                <button onClick={() => setShowOrderModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
              </div>
              
              <div className="mb-6">
                <div className="text-gray-500 text-sm mb-2">商品</div>
                <div className="font-bold text-gray-800">{item.name}</div>
              </div>

              <div className="mb-6">
                <div className="text-gray-500 text-sm mb-2">数量</div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 text-xl font-bold"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-800 w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-gray-500 text-sm mb-2">支付方式</div>
                <div className="flex gap-4">
                  {item.wechatPay && (
                    <button
                      onClick={() => setPaymentMethod('wechat')}
                      className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                        paymentMethod === 'wechat' 
                          ? 'border-[#07C160] bg-[#07C160]/10 text-[#07C160]' 
                          : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      <span>💚</span> 微信支付
                    </button>
                  )}
                  {item.alipay && (
                    <button
                      onClick={() => setPaymentMethod('alipay')}
                      className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                        paymentMethod === 'alipay' 
                          ? 'border-[#1677FF] bg-[#1677FF]/10 text-[#1677FF]' 
                          : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      <span>💙</span> 支付宝
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">总价</span>
                  <span className="text-2xl font-bold text-[#E67E22]">{item.price} × {quantity}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-gray-500 text-sm mb-2">请扫码支付</div>
                <div className="flex justify-center">
                  {paymentMethod === 'wechat' && item.wechatPay && (
                    <img src={item.wechatPay} alt="微信支付" className="w-48 h-48 object-contain" />
                  )}
                  {paymentMethod === 'alipay' && item.alipay && (
                    <img src={item.alipay} alt="支付宝" className="w-48 h-48 object-contain" />
                  )}
                </div>
              </div>

              <button 
                onClick={() => {
                  alert('订单已生成！请完成支付后联系商家确认。');
                  setShowOrderModal(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white rounded-xl font-bold"
              >
                确认支付
              </button>
            </div>
          </div>
        )}

        {/* Bottom padding for fixed order button */}
        {(item.wechatPay || item.alipay) && <div className="h-24"></div>}
      </div>
    </div>
  );
}
