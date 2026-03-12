'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ModuleData {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

interface FormData {
  name: string;
  category: string;
  description: string;
  price: string;
  rating: string;
  image: string;
  video: string;
  address: string;
  phone: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState<string>('food');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    description: '',
    price: '',
    rating: '',
    image: '',
    video: '',
    address: '',
    phone: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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
    { id: 'pet', name: '宠物管理', icon: '🐕', count: 4, description: '宠物店、医疗、训练等' },
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

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setFormData({ ...formData, image: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle video upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert('视频文件不能超过50MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setVideoPreview(base64);
        setFormData({ ...formData, video: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save data
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('');

    // 保存到 localStorage
    const saveData = {
      module: activeModule,
      data: formData,
      timestamp: new Date().toISOString(),
    };

    // 获取现有数据
    const existingData = JSON.parse(localStorage.getItem('adminData') || '{}');
    existingData[activeModule] = existingData[activeModule] || [];
    existingData[activeModule].push(saveData);
    
    localStorage.setItem('adminData', JSON.stringify(existingData));

    // 模拟保存延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSaveStatus('保存成功！');
    setSaving(false);

    setTimeout(() => setSaveStatus(''), 3000);
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
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                        placeholder="请输入项目名称"
                      />
                    </div>
                    <div>
                      <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">分类</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700]"
                      >
                        <option value="">请选择分类</option>
                        <option>热门推荐</option>
                        <option>最新上线</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">详细介绍</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full h-32 px-4 py-3 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355] resize-none"
                      placeholder="请输入详细介绍"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">价格</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                        placeholder="如: ¥80/人"
                      />
                    </div>
                    <div>
                      <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">评分</label>
                      <input
                        type="text"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                        placeholder="如: 4.8"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">图片上传</label>
                    <input
                      type="file"
                      ref={imageInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="预览" className="w-full h-48 object-cover rounded-xl" />
                        <button
                          onClick={() => {
                            setImagePreview('');
                            setFormData({ ...formData, image: '' });
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => imageInputRef.current?.click()}
                        className="border-2 border-dashed border-[#3D3D3D] rounded-xl p-8 text-center hover:border-[#FFD700] transition-colors cursor-pointer"
                      >
                        <svg className="w-12 h-12 mx-auto text-[#8B7355] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-[#8B7355]">点击上传图片</p>
                        <p className="text-[#8B7355] text-xs mt-1">支持 JPG、PNG 格式</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">视频上传</label>
                    <input
                      type="file"
                      ref={videoInputRef}
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    {videoPreview ? (
                      <div className="relative">
                        <video src={videoPreview} controls className="w-full h-48 object-cover rounded-xl" />
                        <button
                          onClick={() => {
                            setVideoPreview('');
                            setFormData({ ...formData, video: '' });
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => videoInputRef.current?.click()}
                        className="border-2 border-dashed border-[#3D3D3D] rounded-xl p-8 text-center hover:border-[#FFD700] transition-colors cursor-pointer"
                      >
                        <svg className="w-12 h-12 mx-auto text-[#8B7355] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="text-[#8B7355]">点击上传视频</p>
                        <p className="text-[#8B7355] text-xs mt-1">支持 MP4、WebM 格式（最大50MB）</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">地址</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                      placeholder="请输入地址"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">联系电话</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                      placeholder="请输入联系电话"
                    />
                  </div>

                  {saveStatus && (
                    <div className={`p-3 rounded-lg text-center ${saveStatus.includes('成功') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {saveStatus}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 h-12 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-lg font-bold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all font-art disabled:opacity-50"
                    >
                      {saving ? '保存中...' : '保存修改'}
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
