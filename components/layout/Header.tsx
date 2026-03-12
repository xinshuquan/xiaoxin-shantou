'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/lib/data';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainCategories = categories.slice(0, 8);
  const userCategories = categories.slice(8);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform">
              新
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#2D3436] leading-tight font-serif">
                小新带你游汕头
              </h1>
              <p className="text-xs text-[#636E72]">吃喝玩乐不用愁</p>
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
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-[#2D3436] hover:bg-[#FFF5F0] hover:text-[#FF6B35] transition-colors font-medium"
                >
                  <span>{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </Link>
                
                {/* Dropdown */}
                {activeDropdown === category.id && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-[#E8E8E8] py-2 animate-in fade-in slide-in-from-top-2">
                    <Link
                      href={`/${category.id}`}
                      className="block px-4 py-2 text-sm text-[#636E72] hover:bg-[#FFF5F0] hover:text-[#FF6B35]"
                    >
                      查看全部
                    </Link>
                    <Link
                      href={`/${category.id}?sort=popular`}
                      className="block px-4 py-2 text-sm text-[#636E72] hover:bg-[#FFF5F0] hover:text-[#FF6B35]"
                    >
                      热门推荐
                    </Link>
                    <Link
                      href={`/${category.id}?sort=nearby`}
                      className="block px-4 py-2 text-sm text-[#636E72] hover:bg-[#FFF5F0] hover:text-[#FF6B35]"
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
                  className="w-48 lg:w-64 h-10 pl-10 pr-4 rounded-full bg-[#F5F5F5] border border-transparent focus:border-[#FF6B35] focus:bg-white outline-none transition-all text-sm"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#636E72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <Link
                href="/orders"
                className="p-2 rounded-full hover:bg-[#F5F5F5] transition-colors"
              >
                <svg className="w-6 h-6 text-[#636E72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
              
              <Link
                href="/orders"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>登录</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#F5F5F5]"
              >
                <svg className="w-6 h-6 text-[#2D3436]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="lg:hidden py-4 border-t border-[#E8E8E8]">
            <div className="mb-4">
              <input
                type="text"
                placeholder="搜索..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-[#F5F5F5] border border-transparent focus:border-[#FF6B35] outline-none text-sm"
              />
            </div>
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.id}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#F9F9F9] hover:bg-[#FFF5F0] transition-colors"
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-sm font-medium text-[#2D3436]">{category.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
