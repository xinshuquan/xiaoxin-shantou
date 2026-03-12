'use client';

import Link from 'next/link';
import { categories, foodData, nightlifeData, stayData, travelData } from '@/lib/data';

export default function HomePage() {
  const featuredData = [
    { ...foodData[0], category: 'food', categoryName: '美食' },
    { ...nightlifeData[0], category: 'nightlife', categoryName: '夜店' },
    { ...stayData[0], category: 'stay', categoryName: '民宿' },
    { ...travelData[0], category: 'travel', categoryName: '旅游' },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0A0A0A] to-[#141414] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Pattern - Golden */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-[#D4AF37]/5 to-[#0D0D0D]/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)`,
        }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float filter hue-rotate-30">🍜</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float filter hue-rotate-30" style={{ animationDelay: '1s' }}>🏖️</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float filter hue-rotate-30" style={{ animationDelay: '2s' }}>🏠</div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-gold mb-4 font-serif animate-shimmer">
            小新带你游汕头
          </h1>
          <p className="text-xl md:text-2xl text-[#C9A227] mb-8 max-w-2xl">
            吃喝玩乐不用愁，一站式搞定汕头本地生活服务
          </p>
          
          {/* Search Box */}
          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              placeholder="搜索美食、民宿、旅游、房产..."
              className="w-full h-14 pl-14 pr-6 rounded-full bg-[#1F1F1F] shadow-xl border border-[#3D3D3D] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none text-lg text-[#FFD700] placeholder-[#8B7355] transition-all"
            />
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 h-10 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-full font-bold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all">
              搜索
            </button>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['潮汕火锅', '海边民宿', '南澳岛', '家政服务', '招聘'].map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${tag}`}
                className="px-4 py-1.5 bg-[#1F1F1F]/60 backdrop-blur rounded-full text-sm text-[#C9A227] border border-[#3D3D3D] hover:bg-[#FFD700] hover:text-[#0D0D0D] hover:border-[#FFD700] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-3 font-serif">全部分类</h2>
          <p className="text-[#8B7355]">发现汕头本地生活服务</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="group p-6 bg-[#141414] rounded-2xl shadow-sm hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300 hover:-translate-y-2 border border-[#2D2D2D] hover:border-[#D4AF37]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto bg-[#1F1F1F] border border-[#3D3D3D]"
              >
                {category.icon}
              </div>
              <h3 className="font-bold text-[#FFD700] text-center mb-1">{category.name}</h3>
              <p className="text-xs text-[#8B7355] text-center">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#FFD700] font-serif">热门推荐</h2>
            <p className="text-[#8B7355] mt-1">精选汕头本地优质商家</p>
          </div>
          <Link href="/food" className="text-[#FFD700] hover:underline font-medium">
            查看更多 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredData.map((item: any) => (
            <Link
              key={item.id}
              href={`/${item.category}/${item.id}`}
              className="group bg-[#141414] rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300 hover:-translate-y-2 border border-[#2D2D2D]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#FFD700] text-[#0D0D0D] text-xs font-bold rounded-full">
                  {item.categoryName}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#FFD700] mb-2 line-clamp-1">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFD700] font-bold">{item.price}</span>
                  <div className="flex items-center gap-1 text-sm text-[#FFD700]">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Food Section Preview */}
      <section className="bg-[#141414] py-12 border-t border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#D4AF37] flex items-center justify-center text-2xl">🍜</div>
              <div>
                <h2 className="text-3xl font-bold text-[#FFD700] font-serif">美食推荐</h2>
                <p className="text-[#8B7355] mt-1">潮汕美食，等你来尝</p>
              </div>
            </div>
            <Link href="/food" className="text-[#FFD700] hover:underline font-medium">
              查看全部 →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {foodData.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href={`/food/${item.id}`}
                className="group bg-[#1F1F1F] rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] transition-all border border-[#2D2D2D]"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-[#FFD700] line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-[#8B7355] mt-1">{item.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFD700] to-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#0D0D0D]">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-[#0D0D0D]/80">合作商家</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10万+</div>
              <div className="text-[#0D0D0D]/80">注册用户</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50万+</div>
              <div className="text-[#0D0D0D]/80">服务订单</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-[#0D0D0D]/80">平均评分</div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1F1F1F] border border-[#FFD700] flex items-center justify-center text-2xl">🗺️</div>
            <div>
              <h2 className="text-3xl font-bold text-[#FFD700] font-serif">周边旅游</h2>
              <p className="text-[#8B7355] mt-1">发现汕头的美丽风景</p>
            </div>
          </div>
          <Link href="/travel" className="text-[#FFD700] hover:underline font-medium">
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelData.map((item) => (
            <Link
              key={item.id}
              href={`/travel/${item.id}`}
              className="group relative h-64 rounded-2xl overflow-hidden border border-[#2D2D2D]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-lg text-[#FFD700] mb-1">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#C9A227]">{item.price}</span>
                  <div className="flex items-center gap-1 text-sm text-[#FFD700]">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#141414] border-t border-[#2D2D2D]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-4 font-serif">成为商家，加入我们</h2>
          <p className="text-[#8B7355] mb-8 max-w-2xl mx-auto">
            入驻「小新带你游汕头」，让更多汕头人和游客发现您的店铺
          </p>
          <Link
            href="/merchant"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-full font-bold hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            立即入驻
          </Link>
        </div>
      </section>
    </div>
  );
}
