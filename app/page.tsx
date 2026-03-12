'use client';

import Link from 'next/link';
import { categories, foodData, nightlifeData, stayData, travelData } from '@/lib/data';

export default function HomePage() {
  const featuredData = [
    { ...foodData[0], category: 'food', categoryName: '🍜 美食' },
    { ...nightlifeData[0], category: 'nightlife', categoryName: '🍺 夜店' },
    { ...stayData[0], category: 'stay', categoryName: '🏨 民宿' },
    { ...travelData[0], category: 'travel', categoryName: '🗺️ 旅游' },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0A0A0A] to-[#141414] min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[650px] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-[#D4AF37]/3 to-[#0D0D0D]/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 50% 100%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)`,
        }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-7xl opacity-20 animate-float filter blur-[1px]">🍜</div>
        <div className="absolute top-40 right-20 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🏖️</div>
        <div className="absolute bottom-20 left-1/4 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🏠</div>
        <div className="absolute top-60 left-1/3 text-4xl opacity-15 animate-float" style={{ animationDelay: '0.5s' }}>🧆</div>
        <div className="absolute bottom-40 right-1/3 text-4xl opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>🎉</div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center pt-16">
          {/* Logo */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center text-[#0D0D0D] text-5xl font-bold mb-6 animate-pulse-glow shadow-[0_0_50px_rgba(255,215,0,0.4)] border-4 border-[#FFD700]">
            <span className="font-calligraphy">新</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-2 font-calligraphy glow-text" style={{ textShadow: '0 0 30px rgba(255,215,0,0.5)' }}>
            小新带你游汕头
          </h1>
          <p className="text-2xl md:text-3xl text-[#FFD700] mb-8 font-calligraphy animate-shimmer">
            吃喝玩乐不用愁！
          </p>
          <p className="text-lg text-[#8B7355] mb-10 max-w-2xl font-premium">
            探索汕头本地最IN的生活服务，吃喝玩乐住行一站式搞定
          </p>
          
          {/* Search Box */}
          <div className="w-full max-w-2xl relative mb-8">
            <input
              type="text"
              placeholder="搜索美食、民宿、旅游、房产..."
              className="w-full h-16 pl-16 pr-32 rounded-full bg-[#1F1F1F]/80 backdrop-blur shadow-[0_0_30px_rgba(255,215,0,0.1)] border border-[#3D3D3D] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none text-lg text-[#FFD700] placeholder-[#8B7355] transition-all"
            />
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-8 h-12 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105 transition-all font-calligraphy">
              搜索
            </button>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            {['潮汕火锅', '海边民宿', '南澳岛', '家政服务', '招聘', '健身房'].map((tag, i) => (
              <Link
                key={tag}
                href={`/search?q=${tag}`}
                className="px-5 py-2 bg-[#1F1F1F]/60 backdrop-blur rounded-full text-sm text-[#C9A227] border border-[#3D3D3D] hover:bg-[#FFD700] hover:text-[#0D0D0D] hover:border-[#FFD700] transition-all hover:animate-wobble font-calligraphy"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Yellow Banner with Lanterns and 潮汕 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700]"></div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Left Red Lantern with Glow */}
        <div className="absolute left-[2%] top-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 w-32 h-40 bg-red-500 rounded-full blur-[40px] opacity-60 animate-pulse"></div>
            <div className="absolute inset-0 w-32 h-40 bg-red-400 rounded-full blur-[60px] opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            {/* Lantern */}
            <div className="relative w-28 h-36 bg-gradient-to-b from-[#DC143C] to-[#8B0000] rounded-2xl flex items-center justify-center animate-float" style={{ boxShadow: '0 0 30px rgba(220,20,60,0.6)' }}>
              {/* Lantern top */}
              <div className="absolute -top-3 w-8 h-4 bg-[#FFD700] rounded-full"></div>
              {/* Lantern bottom */}
              <div className="absolute -bottom-3 w-8 h-4 bg-[#FFD700] rounded-full"></div>
              {/* Fringe */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-red-700/50 rounded-b-lg"></div>
              <span className="text-4xl">🏮</span>
            </div>
          </div>
        </div>
        
        {/* Right Red Lantern with Glow */}
        <div className="absolute right-[2%] top-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 w-32 h-40 bg-red-500 rounded-full blur-[40px] opacity-60 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute inset-0 w-32 h-40 bg-red-400 rounded-full blur-[60px] opacity-40 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
            {/* Lantern */}
            <div className="relative w-28 h-36 bg-gradient-to-b from-[#DC143C] to-[#8B0000] rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '0.5s', boxShadow: '0 0 30px rgba(220,20,60,0.6)' }}>
              {/* Lantern top */}
              <div className="absolute -top-3 w-8 h-4 bg-[#FFD700] rounded-full"></div>
              {/* Lantern bottom */}
              <div className="absolute -bottom-3 w-8 h-4 bg-[#FFD700] rounded-full"></div>
              {/* Fringe */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-red-700/50 rounded-b-lg"></div>
              <span className="text-4xl">🏮</span>
            </div>
          </div>
        </div>
        
        {/* 潮字 - Top Left with Gold Background */}
        <div className="absolute left-[8%] top-4 z-30">
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] px-6 py-3 rounded-xl" style={{ boxShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
            <span 
              className="font-calligraphy text-5xl md:text-6xl text-[#0D0D0D]"
              style={{ 
                animation: 'chaoshan-move-1 3s ease-in-out infinite'
              }}
            >
              潮
            </span>
          </div>
        </div>
        
        {/* 汕字 - Top Right with Gold Background */}
        <div className="absolute right-[8%] top-4 z-30">
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] px-6 py-3 rounded-xl" style={{ boxShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
            <span 
              className="font-calligraphy text-5xl md:text-6xl text-[#0D0D0D]"
              style={{ 
                animation: 'chaoshan-move-2 3s ease-in-out infinite'
              }}
            >
              汕
            </span>
          </div>
        </div>
        
        {/* Center content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] mb-4 font-calligraphy">
            潮汕文化，魅力无限
          </h2>
          <p className="text-xl text-[#0D0D0D]/80 max-w-2xl mx-auto font-premium">
            走进潮汕，感受千年文化的独特魅力
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#FFD700] mb-3 font-calligraphy glow-text">全部分类</h2>
          <p className="text-[#8B7355] text-lg font-premium">发现汕头本地生活服务</p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="group p-6 bg-[#141414] rounded-2xl shadow-sm hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all duration-300 hover:-translate-y-2 border border-[#2D2D2D] hover:border-[#FFD700] card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-5xl mb-4 bg-[#1F1F1F] border-2 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)] group-hover:scale-110 transition-transform duration-300"
              >
                {category.icon}
              </div>
              <h3 className="font-bold text-[#FFD700] text-center mb-1 font-calligraphy text-lg">{category.name}</h3>
              <p className="text-xs text-[#8B7355] text-center">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-[#FFD700] font-calligraphy glow-text">热门推荐</h2>
            <p className="text-[#8B7355] mt-2 text-lg font-premium">精选汕头本地优质商家</p>
          </div>
          <Link href="/food" className="text-[#FFD700] hover:underline font-calligraphy text-lg hover:animate-wobble">
            查看更多 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredData.map((item: any) => (
            <Link
              key={item.id}
              href={`/${item.category}/${item.id}`}
              className="group bg-[#141414] rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all duration-300 hover:-translate-y-2 border border-[#2D2D2D] card-hover"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 px-4 py-1.5 bg-[#FFD700] text-[#0D0D0D] text-xs font-bold rounded-full font-calligraphy">
                  {item.categoryName}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#FFD700] mb-2 font-calligraphy">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFD700] font-bold text-lg">{item.price}</span>
                  <div className="flex items-center gap-1 text-sm text-[#FFD700]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="font-bold">{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Food Section Preview */}
      <section className="bg-[#141414] py-16 border-y border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                <img src="https://picx.zhimg.com/80/7c1ecd02jw1f3apqm2fobj20dw0q0nPD.jpg" alt="潮汕美食" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-[#FFD700] font-calligraphy glow-text">美食推荐</h2>
                <p className="text-[#8B7355] mt-1 text-lg font-premium">潮汕美食，等你来尝</p>
              </div>
            </div>
            <Link href="/food" className="text-[#FFD700] hover:underline font-calligraphy text-lg">
              查看全部 →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {foodData.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href={`/food/${item.id}`}
                className="group bg-[#1F1F1F] rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all border border-[#2D2D2D] card-hover"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-[#FFD700] line-clamp-1 font-calligraphy">{item.name}</h3>
                  <p className="text-xs text-[#8B7355] mt-1">{item.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#FFD700] to-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#0D0D0D]">
            {[
              { num: '500+', label: '合作商家', icon: '🏪' },
              { num: '10万+', label: '注册用户', icon: '👥' },
              { num: '50万+', label: '服务订单', icon: '📋' },
              { num: '4.9', label: '平均评分', icon: '⭐' },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-[#0D0D0D]/10 rounded-2xl backdrop-blur hover:scale-105 transition-transform">
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2 font-calligraphy">{stat.num}</div>
                <div className="text-[#0D0D0D]/80 font-calligraphy text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.4)]">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200" alt="南澳岛" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#FFD700] font-calligraphy glow-text">周边旅游</h2>
              <p className="text-[#8B7355] mt-1 text-lg font-premium">发现汕头的美丽风景</p>
            </div>
          </div>
          <Link href="/travel" className="text-[#FFD700] hover:underline font-calligraphy text-lg">
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelData.map((item) => (
            <Link
              key={item.id}
              href={`/travel/${item.id}`}
              className="group relative h-72 rounded-2xl overflow-hidden border-2 border-[#2D2D2D] hover:border-[#FFD700] transition-all card-hover"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-bold text-xl text-[#FFD700] mb-2 font-calligraphy">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#C9A227] font-bold">{item.price}</span>
                  <div className="flex items-center gap-1 text-sm text-[#FFD700]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="font-bold">{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#141414] border-t border-[#2D2D2D]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#FFD700] mb-6 font-calligraphy glow-text">成为商家，加入我们</h2>
          <p className="text-[#8B7355] mb-8 max-w-2xl mx-auto text-lg font-premium">
            入驻「小新带你游汕头」，让更多汕头人和游客发现您的店铺
          </p>
          <Link
            href="/merchant"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-full font-bold text-xl hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] hover:scale-105 transition-all font-calligraphy"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            立即入驻
          </Link>
        </div>
      </section>
    </div>
  );
}
