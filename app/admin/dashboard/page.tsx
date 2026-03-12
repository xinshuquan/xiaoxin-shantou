'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ModuleData {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState<string>('food');

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const modules: ModuleData[] = [
    { id: 'food', name: '美食管理', icon: '🍜', count: 6, description: '餐厅、小吃、火锅等' },
    { id: 'nightlife', name: '夜店管理', icon: '🍺', count: 4, description: '酒吧、KTV、清吧等' },
    { id: 'stay', name: '民宿管理', icon: '🏨', count: 4, description: '民宿、酒店、公寓等' },
    { id: 'travel', name: '旅游管理', icon: '🗺️', count: 4, description: '景点、海岛、博物馆等' },
    { id: 'property', name: '房产管理', icon: '🏠', count: 4, description: '新房、二手房、租房等' },
    { id: 'home-service', name: '家政管理', icon: '🧹', count: 4, description: '保洁、维修、搬家等' },
    { id: 'jobs', name: '招聘管理', icon: '💼', count: 4, description: '全职、兼职、实习等' },
    { id: 'wellness', name: '养生管理', icon: '🧘', count: 4, description: '健身、瑜伽、游泳等' },
  ];

  const stats = [
    { label: '总商家数', value: '34', icon: '🏪' },
    { label: '总用户数', value: '10,000+', icon: '👥' },
    { label: '总订单数', value: '50,000+', icon: '📋' },
    { label: '总收入', value: '¥100,000+', icon: '💰' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#141414]">
      {/* Header */}
      <header className="bg-[#0D0D0D] border-b border-[#2D2D2D] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center text-[#0D0D0D] font-bold">
              <span className="font-art">新</span>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[#FFD700] font-art">后台管理系统</h1>
              <p className="text-xs text-[#8B7355]">小新带你游汕头</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0D0D0D] transition-all font-art"
          >
            退出登录
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#141414] p-6 rounded-xl border border-[#2D2D2D] hover:border-[#FFD700] transition-all">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-[#FFD700] font-art">{stat.value}</div>
              <div className="text-sm text-[#8B7355]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Module Management */}
        <div className="bg-[#141414] rounded-2xl border border-[#2D2D2D] overflow-hidden">
          <div className="p-6 border-b border-[#2D2D2D]">
            <h2 className="text-2xl font-bold text-[#FFD700] font-art glow-text">模块管理</h2>
            <p className="text-[#8B7355] mt-1">管理各个板块的内容，包括文字描述、图片、视频上传</p>
          </div>

          {/* Module Tabs */}
          <div className="flex overflow-x-auto gap-2 p-4 border-b border-[#2D2D2D]">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all font-art ${
                  activeModule === module.id
                    ? 'bg-[#FFD700] text-[#0D0D0D]'
                    : 'bg-[#1F1F1F] text-[#C9A227] hover:bg-[#2D2D2D]'
                }`}
              >
                <span>{module.icon}</span>
                <span>{module.name}</span>
              </button>
            ))}
          </div>

          {/* Module Content */}
          <div className="p-6">
            {modules.filter(m => m.id === activeModule).map(module => (
              <div key={module.id}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#FFD700] font-art">{module.icon} {module.name}</h3>
                    <p className="text-[#8B7355] text-sm">{module.description} - 共 {module.count} 条</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-lg font-bold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all font-art">
                    + 添加新项目
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">项目名称</label>
                      <input
                        type="text"
                        className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                        placeholder="请输入项目名称"
                      />
                    </div>
                    <div>
                      <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">分类</label>
                      <select className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700]">
                        <option>请选择分类</option>
                        <option>热门推荐</option>
                        <option>最新上线</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">详细介绍</label>
                    <textarea
                      className="w-full h-32 px-4 py-3 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355] resize-none"
                      placeholder="请输入详细介绍"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">价格</label>
                      <input
                        type="text"
                        className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                        placeholder="如: ¥80/人"
                      />
                    </div>
                    <div>
                      <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">评分</label>
                      <input
                        type="text"
                        className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                        placeholder="如: 4.8"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">图片上传</label>
                    <div className="border-2 border-dashed border-[#3D3D3D] rounded-xl p-8 text-center hover:border-[#FFD700] transition-colors cursor-pointer">
                      <svg className="w-12 h-12 mx-auto text-[#8B7355] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[#8B7355]">点击或拖拽上传图片</p>
                      <p className="text-[#8B7355] text-xs mt-1">支持 JPG、PNG 格式</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">视频上传</label>
                    <div className="border-2 border-dashed border-[#3D3D3D] rounded-xl p-8 text-center hover:border-[#FFD700] transition-colors cursor-pointer">
                      <svg className="w-12 h-12 mx-auto text-[#8B7355] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[#8B7355]">点击或拖拽上传视频</p>
                      <p className="text-[#8B7355] text-xs mt-1">支持 MP4、WebM 格式</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">地址</label>
                    <input
                      type="text"
                      className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                      placeholder="请输入地址"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">联系电话</label>
                    <input
                      type="text"
                      className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                      placeholder="请输入联系电话"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button className="flex-1 h-12 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-lg font-bold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all font-art">
                      保存修改
                    </button>
                    <button className="px-6 h-12 bg-[#1F1F1F] border border-[#3D3D3D] text-[#C9A227] rounded-lg font-bold hover:bg-[#2D2D2D] transition-all font-art">
                      预览
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Integration */}
        <div className="mt-8 bg-[#141414] p-6 rounded-2xl border border-[#2D2D2D]">
          <h3 className="text-xl font-bold text-[#FFD700] mb-4 font-art">🚧 后期功能预留</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1F1F1F] rounded-xl border border-[#3D3D3D]">
              <h4 className="text-[#FFD700] font-bold mb-2 font-art">📱 微信小程序</h4>
              <p className="text-[#8B7355] text-sm">后期将打通微信小程序，实现一键分享、微信登录、微信支付等功能</p>
            </div>
            <div className="p-4 bg-[#1F1F1F] rounded-xl border border-[#3D3D3D]">
              <h4 className="text-[#FFD700] font-bold mb-2 font-art">🎵 抖音链接</h4>
              <p className="text-[#8B7355] text-sm">后期将支持抖音视频嵌入、抖音团购跳转等功能</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
