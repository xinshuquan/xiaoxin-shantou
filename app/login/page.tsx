'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#141414] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center text-[#0D0D0D] text-4xl font-bold mb-4 shadow-lg border-4 border-[#FFD700]">
            <span className="font-calligraphy">新</span>
          </div>
          <h1 className="text-3xl font-bold text-[#FFD700] font-calligraphy glow-text">游客登录</h1>
          <p className="text-[#8B7355] mt-2">登录后享受更多服务</p>
        </div>

        <div className="bg-[#141414] rounded-2xl p-8 border border-[#2D2D2D]">
          <div className="space-y-4">
            <div>
              <label className="block text-[#C9A227] text-sm mb-2">手机号</label>
              <input
                type="tel"
                placeholder="请输入手机号"
                className="w-full h-12 px-4 rounded-full bg-[#1F1F1F] border border-[#3D3D3D] focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
              />
            </div>
            <div>
              <label className="block text-[#C9A227] text-sm mb-2">验证码</label>
              <div className="flex gap-2">
                <input
                  type="code"
                  placeholder="请输入验证码"
                  className="flex-1 h-12 px-4 rounded-full bg-[#1F1F1F] border border-[#3D3D3D] focus:border-[#FFD700] outline-none text-[#FFD700] placeholder-[#8B7355]"
                />
                <button className="px-4 h-12 bg-[#1F1F1F] border border-[#3D3D3D] rounded-full text-[#FFD700] text-sm hover:border-[#FFD700] transition-colors">
                  获取验证码
                </button>
              </div>
            </div>
            <button className="w-full h-12 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#0D0D0D] rounded-full font-bold hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all">
              登录
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-[#8B7355] text-sm">还没有账号？</span>
            <span className="text-[#FFD700] text-sm ml-1 cursor-pointer hover:underline">立即注册</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#8B7355] text-sm hover:text-[#FFD700] transition-colors">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
