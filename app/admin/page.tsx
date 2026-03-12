'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock authentication - in production this should be server-side
    setTimeout(() => {
      if (username === 'admin' && password === 'xsq2724436') {
        // Store session
        localStorage.setItem('adminAuth', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('用户名或密码错误');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#141414] flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`,
      }}></div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center text-[#0D0D0D] text-4xl font-bold mx-auto mb-4 animate-pulse-glow">
            <span className="font-art">新</span>
          </div>
          <h1 className="text-3xl font-bold text-[#FFD700] font-art glow-text">管理员登录</h1>
          <p className="text-[#8B7355] mt-2">小新带你游汕头后台管理系统</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-[#141414] p-8 rounded-2xl border border-[#2D2D2D] shadow-[0_0_30px_rgba(255,215,0,0.1)]">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/20 outline-none text-[#FFD700] placeholder-[#8B7355] transition-all"
              placeholder="请输入用户名"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#FFD700] text-sm font-medium mb-2 font-art">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 bg-[#1F1F1F] border border-[#3D3D3D] rounded-lg focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/20 outline-none text-[#FFD700] placeholder-[#8B7355] transition-all"
              placeholder="请输入密码"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-lg font-bold text-lg hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-art"
          >
            {loading ? '登录中...' : '登 录'}
          </button>

          <div className="mt-6 text-center">
            <a href="/" className="text-[#8B7355] hover:text-[#FFD700] text-sm transition-colors">
              ← 返回首页
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
