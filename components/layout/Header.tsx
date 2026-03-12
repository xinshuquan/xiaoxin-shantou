'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/lib/data';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainCategories = categories.slice(0, 8);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center text-[#0D0D0D] text-2xl font-bold shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:animate-pulse-glow">
              <span className="font-art">新</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#FFD700] leading-tight font-art glow-text">
                小新带你游汕头
              </h1>
              <p className="text-xs text-[#8B7355] font-art">吃喝玩乐不用愁！</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainCategories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(category.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`/${category.id}`}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-[#C9A227] hover:bg-[#1F1F1F] hover:text-[#FFD700] transition-all duration-300 font-medium border border-transparent hover:border-[#FFD700]/30"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-art">{category.name}</span>
                </Link>
                
                {/* Dropdown */}
                {activeDropdown === category.id && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#141414] rounded-xl shadow-xl border border-[#2D2D2D] py-2 animate-float backdrop-blur-md">
                    <Link
                      href={`/${category.id}`}
                      className="block px-4 py-2 text-sm text-[#8B7355] hover:bg-[#1F1F1F] hover:text-[#FFD700] transition-colors font-art"
                    >
                      查看全部
                    </Link>
                    <Link
                      href={`/${category.id}?sort=popular`}
                      className="block px-4 py-2 text-sm text-[#8B7355] hover:bg-[#1F1F1F] hover:text-[#FFD700] transition-colors font-art"
                    >
                      热门推荐
                    </Link>
                    <Link
                      href={`/${category.id}?sort=nearby`}
                      className="block px-4 py-2 text-sm text-[#8B7355] hover:bg-[#1F1F1F] hover:text-[#FFD700] transition-colors font-art"
                    >
                      附近推荐
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索汕头美食..."
                  className="w-48 lg:w-64 h-10 pl-10 pr-4 rounded-full bg-[#1F1F1F] border border-[#3D3D3D] focus:border-[#FFD700] focus:bg-[#141414] outline-none transition-all text-sm text-[#FFD700] placeholder-[#8B7355]"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <Link
                href="/orders"
                className="p-2 rounded-full hover:bg-[#1F1F1F] transition-colors hover:animate-wobble"
              >
                <svg className="w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
              
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-full text-sm font-bold hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:scale-105 transition-all font-art"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>管理</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#1F1F1F]"
              >
                <svg className="w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#2D2D2D]">
            <div className="mb-4">
              <input
                type="text"
                placeholder="搜索..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-[#1F1F1F] border border-[#3D3D3D] focus:border-[#FFD700] outline-none text-sm text-[#FFD700] placeholder-[#8B7355]"
              />
            </div>
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.id}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#141414] hover:bg-[#1F1F1F] border border-[#2D2D2D] transition-colors"
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-sm font-medium text-[#FFD700] font-art">{category.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
