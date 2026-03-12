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
  images: string[];
  videos: string[];
  address: string;
  phone: string;
  moduleName?: string;
}

interface SavedItem {
  id: string;
  data: FormData;
  timestamp: string;
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
    images: [],
    videos: [],
    address: '',
    phone: '',
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [existingItems, setExistingItems] = useState<SavedItem[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Load existing items when module changes
  useEffect(() => {
    const allData = JSON.parse(localStorage.getItem('adminData') || '{}');
    const moduleData = allData[activeModule] || [];
    setExistingItems(moduleData);
    // Reset form when module changes
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      rating: '',
      images: [],
      videos: [],
      address: '',
      phone: '',
    });
    setImagePreviews([]);
    setVideoPreviews([]);
  }, [activeModule]);

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

  // Handle multiple image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      let loaded = 0;
      
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          loaded++;
          if (loaded === files.length) {
            setImagePreviews([...imagePreviews, ...newImages]);
            setFormData({ ...formData, images: [...formData.images, ...newImages] });
          }
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset input
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  // Handle multiple video upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newVideos: string[] = [];
      let loaded = 0;
      
      Array.from(files).forEach((file) => {
        if (file.size > 50 * 1024 * 1024) {
          alert(`视频 ${file.name} 超过50MB，跳过`);
          loaded++;
          if (loaded === files.length) {
            if (newVideos.length > 0) {
              setVideoPreviews([...videoPreviews, ...newVideos]);
              setFormData({ ...formData, videos: [...formData.videos, ...newVideos] });
            }
          }
          return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
          newVideos.push(reader.result as string);
          loaded++;
          if (loaded === files.length) {
            if (newVideos.length > 0) {
              setVideoPreviews([...videoPreviews, ...newVideos]);
              setFormData({ ...formData, videos: [...formData.videos, ...newVideos] });
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset input
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    const newImages = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImages);
    setFormData({ ...formData, images: newImages });
  };

  // Remove video
  const removeVideo = (index: number) => {
    const newVideos = videoPreviews.filter((_, i) => i !== index);
    setVideoPreviews(newVideos);
    setFormData({ ...formData, videos: newVideos });
  };

  // Handle form input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Delete item
  const deleteItem = (id: string) => {
    if (!confirm('确定要删除这条记录吗？')) return;
    
    const allData = JSON.parse(localStorage.getItem('adminData') || '{}');
    const moduleData = allData[activeModule] || [];
    const updated = moduleData.filter((item: SavedItem) => item.id !== id);
    allData[activeModule] = updated;
    localStorage.setItem('adminData', JSON.stringify(allData));
    setExistingItems(updated);
  };

  // Save data
  const handleSave = async () => {
    if (!formData.name) {
      setSaveStatus('请填写项目名称');
      setTimeout(() => setSaveStatus(''), 3000);
      return;
    }

    setSaving(true);
    setSaveStatus('');

    // Get current module name
    const currentModule = modules.find(m => m.id === activeModule);
    
    const saveData: SavedItem = {
      id: Date.now().toString(),
      data: {
        ...formData,
        moduleName: currentModule?.name || activeModule,
      },
      timestamp: new Date().toISOString(),
    };

    // Get existing data
    const allData = JSON.parse(localStorage.getItem('adminData') || '{}');
    const moduleData = allData[activeModule] || [];
    moduleData.push(saveData);
    allData[activeModule] = moduleData;
    
    localStorage.setItem('adminData', JSON.stringify(allData));
    
    // Also save to a public key that can be read by frontend
    localStorage.setItem('publicData', JSON.stringify(allData));
    
    // Dispatch custom event to notify other pages
    window.dispatchEvent(new Event('adminDataUpdate'));

    await new Promise(resolve => setTimeout(resolve, 1000));

    setSaveStatus('保存成功！');
    setSaving(false);
    
    // Reset form
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      rating: '',
      images: [],
      videos: [],
      address: '',
      phone: '',
    });
    setImagePreviews([]);
    setVideoPreviews([]);
    
    // Refresh list
    setExistingItems(moduleData);

    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Edit existing item
  const editItem = (item: SavedItem) => {
    setFormData({
      name: item.data.name || '',
      category: item.data.category || '',
      description: item.data.description || '',
      price: item.data.price || '',
      rating: item.data.rating || '',
      images: item.data.images || [],
      videos: item.data.videos || [],
      address: item.data.address || '',
      phone: item.data.phone || '',
    });
    setImagePreviews(item.data.images || []);
    setVideoPreviews(item.data.videos || []);
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
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">图片上传（可多选）</label>
                    <input
                      type="file"
                      ref={imageInputRef}
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div 
                      onClick={() => imageInputRef.current?.click()}
                      className="border-2 border-dashed border-[#3D3D3D] rounded-xl p-4 text-center hover:border-[#FFD700] transition-colors cursor-pointer mb-3"
                    >
                      <svg className="w-8 h-8 mx-auto text-[#8B7355] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-[#8B7355] text-sm">点击选择图片（可多选）</p>
                    </div>
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {imagePreviews.map((img, index) => (
                          <div key={index} className="relative">
                            <img src={img} alt={`图片${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">视频上传（可多选，最大50MB/个）</label>
                    <input
                      type="file"
                      ref={videoInputRef}
                      accept="video/*"
                      multiple
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <div 
                      onClick={() => videoInputRef.current?.click()}
                      className="border-2 border-dashed border-[#3D3D3D] rounded-xl p-4 text-center hover:border-[#FFD700] transition-colors cursor-pointer mb-3"
                    >
                      <svg className="w-8 h-8 mx-auto text-[#8B7355] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-[#8B7355] text-sm">点击选择视频（可多选）</p>
                    </div>
                    {videoPreviews.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {videoPreviews.map((video, index) => (
                          <div key={index} className="relative">
                            <video src={video} className="w-full h-24 object-cover rounded-lg" />
                            <button
                              onClick={() => removeVideo(index)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
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
                    <button 
                      onClick={() => {
                        setFormData({
                          name: '',
                          category: '',
                          description: '',
                          price: '',
                          rating: '',
                          images: [],
                          videos: [],
                          address: '',
                          phone: '',
                        });
                        setImagePreviews([]);
                        setVideoPreviews([]);
                      }}
                      className="px-6 h-12 bg-[#1F1F1F] border border-[#3D3D3D] text-[#C9A227] rounded-lg font-bold hover:bg-[#2D2D2D] transition-all font-art"
                    >
                      清空
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Existing Items List */}
          {existingItems.length > 0 && (
            <div className="mt-8 bg-[#141414] rounded-2xl border border-[#2D2D2D] overflow-hidden">
              <div className="p-6 border-b border-[#2D2D2D]">
                <h3 className="text-xl font-bold text-[#FFD700] font-art">已发布的内容</h3>
                <p className="text-[#8B7355] text-sm mt-1">共 {existingItems.length} 条记录</p>
              </div>
              <div className="divide-y divide-[#2D2D2D]">
                {existingItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-[#1F1F1F] transition-colors">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#FFD700] font-bold truncate">{item.data.name}</h4>
                      <p className="text-[#8B7355] text-sm truncate">{item.data.description || '暂无描述'}</p>
                      <div className="flex gap-2 mt-2">
                        {item.data.images?.length > 0 && (
                          <span className="text-xs bg-[#FFD700]/20 text-[#FFD700] px-2 py-1 rounded">
                            📷 {item.data.images.length}张图片
                          </span>
                        )}
                        {item.data.videos?.length > 0 && (
                          <span className="text-xs bg-[#FFD700]/20 text-[#FFD700] px-2 py-1 rounded">
                            🎬 {item.data.videos.length}个视频
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => editItem(item)}
                        className="px-3 py-1 bg-[#FFD700] text-[#0D0D0D] rounded text-sm font-bold hover:shadow-[0_0_10px_rgba(255,215,0,0.4)] transition-all"
                      >
                        编辑
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm font-bold hover:bg-red-600 transition-all"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
