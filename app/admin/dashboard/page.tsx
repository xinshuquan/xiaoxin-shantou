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
}

interface SavedItem {
  id: string;
  moduleId: string;
  data: FormData;
  timestamp: string;
}

// Compress image to reduce size
const compressImage = (file: File, maxWidth = 800): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

const STORAGE_KEY = 'xiaoxin_admin_';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState<string>('food');
  const [formData, setFormData] = useState<FormData>({
    name: '', category: '', description: '', price: '', rating: '',
    images: [], videos: [], address: '', phone: '',
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [existingItems, setExistingItems] = useState<SavedItem[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const loadData = () => {
    try {
      const key = STORAGE_KEY + activeModule;
      const data = localStorage.getItem(key);
      if (data) setExistingItems(JSON.parse(data));
      else setExistingItems([]);
    } catch (e) { setExistingItems([]); }
  };

  useEffect(() => { loadData(); }, [activeModule]);
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) router.push('/admin');
    else setIsAuthenticated(true);
  }, [router]);

  const modules: ModuleData[] = [
    { id: 'food', name: '美食管理', icon: '🍜', count: 6, description: '餐厅、小吃、火锅等' },
    { id: 'nightlife', name: '夜店管理', icon: '🍺', count: 4, description: '酒吧、KTV、清吧等' },
    { id: 'stay', name: '民宿管理', icon: '🏨', count: 4, description: '民宿、酒店、公寓等' },
    { id: 'travel', name: '旅游管理', icon: '🗺️', count: 4, description: '景点、海岛、博物馆等' },
    { id: 'property', name: '房产管理', icon: '🏠', count: 4, description: '新房，二手房、租房等' },
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

  const handleLogout = () => { localStorage.removeItem('adminAuth'); router.push('/admin'); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSaveStatus('处理图片...');
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        try { newImages.push(await compressImage(files[i])); } catch {}
      }
      setImagePreviews(p => [...p, ...newImages]);
      setFormData(d => ({ ...d, images: [...d.images, ...newImages] }));
      setSaveStatus('');
    }
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Check total size first
      let totalSize = 0;
      Array.from(files).forEach(f => totalSize += f.size);
      
      if (totalSize > 100 * 1024 * 1024) {
        alert('视频总大小不能超过100MB');
        return;
      }
      
      setSaveStatus('上传视频中...');
      const newVideos: string[] = [];
      const newPreviews: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          let videoUrl = '';
          
          // Upload to our API which uses server-side Vercel Blob
          const formData = new FormData();
          formData.append('file', file);
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
            throw new Error(errorData.error || 'Upload failed');
          }
          
          const result = await response.json();
          videoUrl = result.url;
          setSaveStatus('✓ 视频上传成功（云端存储）');
          
          newVideos.push(videoUrl);
          // Create object URL for preview
          newPreviews.push(URL.createObjectURL(file));
        } catch (error) {
          console.error('Upload error:', error);
          const errorMsg = error instanceof Error ? error.message : '未知错误';
          alert(`上传失败: ${errorMsg}`);
        }
      }
      
      if (newVideos.length > 0) {
        setVideoPreviews(p => [...p, ...newPreviews]);
        setFormData(d => ({ ...d, videos: [...d.videos, ...newVideos] }));
      }
      
      setSaveStatus('');
    }
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const removeImage = (i: number) => {
    const n = imagePreviews.filter((_, x) => x !== i);
    setImagePreviews(n); setFormData(d => ({ ...d, images: n }));
  };
  const removeVideo = (i: number) => {
    const n = videoPreviews.filter((_, x) => x !== i);
    setVideoPreviews(n); setFormData(d => ({ ...d, videos: n }));
  };
  const handleInputChange = (e: any) => setFormData(d => ({ ...d, [e.target.name]: e.target.value }));
  const deleteItem = (id: string) => {
    if (!confirm('删除？')) return;
    const u = existingItems.filter(x => x.id !== id);
    localStorage.setItem(STORAGE_KEY + activeModule, JSON.stringify(u));
    setExistingItems(u);
  };

  const handleSave = () => {
    if (!formData.name) { setSaveStatus('请填写项目名称'); setTimeout(() => setSaveStatus(''), 3000); return; }
    
    // Check data size before saving (localStorage typically has 5-10MB limit)
    const dataSize = JSON.stringify(formData).length;
    const sizeInMB = (dataSize / (1024 * 1024)).toFixed(2);
    
    // 检查是否有本地存储的视频（base64）
    const hasLocalVideo = formData.videos.some((v: string) => v.startsWith('data:video'));
    if (hasLocalVideo) {
      setSaveStatus('检测到本地视频（未上传到云端）。请确保已配置 Vercel Blob，或使用更小的视频文件。');
      setTimeout(() => setSaveStatus(''), 8000);
      return;
    }
    
    if (dataSize > 8 * 1024 * 1024) {
      setSaveStatus(`数据过大 (${sizeInMB}MB)，请减少图片数量或使用更小的图片文件`);
      setTimeout(() => setSaveStatus(''), 5000);
      return;
    }
    
    setSaving(true); setSaveStatus('保存中...');
    try {
      const item: SavedItem = { id: `${activeModule}_${Date.now()}`, moduleId: activeModule, data: { ...formData }, timestamp: new Date().toISOString() };
      const u = [...existingItems, item];
      localStorage.setItem(STORAGE_KEY + activeModule, JSON.stringify(u));
      setSaveStatus('保存成功！');
      setFormData({ name: '', category: '', description: '', price: '', rating: '', images: [], videos: [], address: '', phone: '' });
      setImagePreviews([]); setVideoPreviews([]); setExistingItems(u);
    } catch (err: any) {
      console.error('Save error:', err);
      if (err.name === 'QuotaExceededError' || err.message?.includes('quota')) {
        setSaveStatus('存储空间不足，请删除一些旧数据');
      } else {
        setSaveStatus('保存失败，数据可能过大');
      }
    }
    setSaving(false); setTimeout(() => setSaveStatus(''), 3000);
  };

  const editItem = (item: SavedItem) => { setFormData(item.data); setImagePreviews(item.data.images || []); setVideoPreviews(item.data.videos || []); };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#141414]">
      <header className="bg-[#0D0D0D] border-b border-[#2D2D2D] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center text-[#0D0D0D] font-bold"><span className="font-art">新</span></Link>
            <div><h1 className="text-xl font-bold text-[#FFD700] font-art">后台管理系统</h1><p className="text-xs text-[#8B7355]">小新带你游汕头</p></div>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0D0D0D]">退出登录</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (<div key={i} className="bg-[#141414] p-6 rounded-xl border border-[#2D2D2D]"><div className="text-3xl mb-2">{s.icon}</div><div className="text-2xl font-bold text-[#FFD700]">{s.value}</div><div className="text-sm text-[#8B7355]">{s.label}</div></div>))}
        </div>
        <div className="bg-[#141414] rounded-2xl border border-[#2D2D2D]">
          <div className="p-6 border-b border-[#2D2D2D]"><h2 className="text-2xl font-bold text-[#FFD700]">模块管理</h2><p className="text-[#8B7355] text-sm">管理各个板块的内容，图片、视频上传</p></div>
          <div className="flex overflow-x-auto gap-2 p-4 border-b border-[#2D2D2D]">
            {modules.map(m => (<button key={m.id} onClick={() => { setActiveModule(m.id); setFormData({ name: '', category: '', description: '', price: '', rating: '', images: [], videos: [], address: '', phone: '' }); setImagePreviews([]); setVideoPreviews([]); }} className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${activeModule === m.id ? 'bg-[#FFD700] text-[#0D0D0D]' : 'bg-[#1F1F1F] text-[#C9A227]'}`}><span>{m.icon}</span><span>{m.name}</span></button>))}
          </div>
          <div className="p-6">
            {modules.filter(m => m.id === activeModule).map(m => (
              <div key={m.id}>
                <div className="mb-6"><h3 className="text-xl font-bold text-[#FFD700]">{m.icon} {m.name}</h3><p className="text-[#8B7355] text-sm">{m.description} - 共 {m.count + existingItems.length} 条</p></div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-[#FFD700] text-sm mb-2">项目名称 *</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700]" placeholder="请输入项目名称" /></div>
                    <div><label className="block text-[#FFD700] text-sm mb-2">分类</label><select name="category" value={formData.category} onChange={handleInputChange} className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700]"><option value="">请选择</option><option>热门推荐</option><option>最新上线</option></select></div>
                  </div>
                  <div><label className="block text-[#FFD700] text-sm mb-2">详细介绍</label><textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full h-32 px-4 py-3 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700] resize-none" placeholder="请输入详细介绍" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-[#FFD700] text-sm mb-2">价格</label><input type="text" name="price" value={formData.price} onChange={handleInputChange} className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700]" placeholder="如: ¥80/人" /></div>
                    <div><label className="block text-[#FFD700] text-sm mb-2">评分</label><input type="text" name="rating" value={formData.rating} onChange={handleInputChange} className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700]" placeholder="如: 4.8" /></div>
                  </div>
                  <div>
                    <label className="block text-[#FFD700] text-sm mb-2">图片上传（自动压缩）</label>
                    <input type="file" ref={imageInputRef} accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                    <div onClick={() => imageInputRef.current?.click()} className="border-2 border-dashed border-[#3D3D3D] rounded-xl p-4 text-center hover:border-[#FFD700] cursor-pointer mb-3">点击选择图片</div>
                    {imagePreviews.length > 0 && <div className="grid grid-cols-3 gap-2">{imagePreviews.map((img, i) => <div key={i} className="relative"><img src={img} className="w-full h-24 object-cover rounded-lg" /><button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full">×</button></div>)}</div>}
                  </div>
                  <div>
                    <label className="block text-[#FFD700] text-sm mb-2">视频上传（上传到云端，支持100MB）</label>
                    <input type="file" ref={videoInputRef} accept="video/*" multiple onChange={handleVideoUpload} className="hidden" />
                    <div onClick={() => videoInputRef.current?.click()} className="border-2 border-dashed border-[#3D3D3D] rounded-xl p-4 text-center hover:border-[#FFD700] cursor-pointer mb-3">点击选择视频</div>
                    {videoPreviews.length > 0 && <div className="grid grid-cols-2 gap-2">{videoPreviews.map((v, i) => <div key={i} className="relative"><video src={v} className="w-full h-24 object-cover rounded-lg" /><button onClick={() => removeVideo(i)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full">×</button></div>)}</div>}
                  </div>
                  <div><label className="block text-[#FFD700] text-sm mb-2">地址</label><input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700]" /></div>
                  <div><label className="block text-[#FFD700] text-sm mb-2">电话</label><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] outline-none text-[#FFD700]" /></div>
                  {saveStatus && <div className={`p-3 rounded-lg text-center ${saveStatus.includes('成功') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{saveStatus}</div>}
                  <div className="flex gap-4">
                    <button onClick={handleSave} disabled={saving} className="flex-1 h-12 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-lg font-bold disabled:opacity-50">{saving ? '保存中...' : '保存修改'}</button>
                    <button onClick={() => { setFormData({ name: '', category: '', description: '', price: '', rating: '', images: [], videos: [], address: '', phone: '' }); setImagePreviews([]); setVideoPreviews([]); }} className="px-6 h-12 bg-[#1F1F1F] border border-[#3D3D3D] text-[#C9A227] rounded-lg">清空</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {existingItems.length > 0 && (
            <div className="mt-8 border-t border-[#2D2D2D]">
              <div className="p-6 border-b border-[#2D2D2D]"><h3 className="text-xl font-bold text-[#FFD700]">已发布 ({existingItems.length})</h3></div>
              <div className="divide-y divide-[#2D2D2D]">
                {existingItems.map(item => (
                  <div key={item.id} className="p-4 flex items-center gap-4">
                    <div className="flex-1"><h4 className="text-[#FFD700] font-bold">{item.data.name}</h4><p className="text-[#8B7355] text-sm">{item.data.description || '暂无'}</p><div className="flex gap-2 mt-2">{item.data.images?.length > 0 && <span className="text-xs bg-[#FFD700]/20 text-[#FFD700] px-2 rounded">📷 {item.data.images.length}</span>}{item.data.videos?.length > 0 && <span className="text-xs bg-[#FFD700]/20 text-[#FFD700] px-2 rounded">🎬 {item.data.videos.length}</span>}</div></div>
                    <div className="flex gap-2"><button onClick={() => editItem(item)} className="px-3 py-1 bg-[#FFD700] text-[#0D0D0D] rounded text-sm">编辑</button><button onClick={() => deleteItem(item.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">删除</button></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
