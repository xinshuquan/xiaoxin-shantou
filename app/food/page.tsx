'use client';

import Link from 'next/link';
import { foodData, categories } from '@/lib/data';

export default function FoodPage() {
  const category = categories[0];
  const categories_list = ['全部', '潮汕菜', '火锅', '烧烤', '小吃', '甜品', '快餐'];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#FFD700] to-[#D4AF37] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4 filter hue-rotate-30">{category.icon}</div>
          <h1 className="text-4xl font-bold text-[#0D0D0D] mb-3 font-serif">{category.name}</h1>
          <p className="text-[#0D0D0D]/80 text-lg">{category.description}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#141414] border-b border-[#2D2D2D] sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories_list.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === '全部'
                    ? 'bg-[#FFD700] text-[#0D0D0D]'
                    : 'bg-[#1F1F1F] text-[#8B7355] hover:bg-[#FFD700]/20 hover:text-[#FFD700] border border-[#3D3D3D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodData.map((item) => (
            <Link
              key={item.id}
              href={`/food/${item.id}`}
              className="group bg-[#141414] rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300 border border-[#2D2D2D]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#FFD700] text-[#0D0D0D] text-xs font-bold rounded-full">
                  {item.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#FFD700] mb-2 group-hover:text-[#FFE44D] transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-[#8B7355] mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-[#1F1F1F] text-[#FFD700] text-xs rounded border border-[#3D3D3D]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#2D2D2D]">
                  <span className="text-[#FFD700] font-bold">{item.price}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <svg className="w-4 h-4 text-[#FFD700] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="font-medium text-[#FFD700]">{item.rating}</span>
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
