'use client';

import Link from 'next/link';

export default function MerchantPage() {
  const steps = [
    { num: '1', title: '提交资料', desc: '填写商家基本信息', icon: '📝' },
    { num: '2', title: '资质审核', desc: '1-3个工作日内完成', icon: '✅' },
    { num: '3', title: '签约入驻', desc: '签订合作协议', icon: '🤝' },
    { num: '4', title: '开店营业', desc: '正式上线运营', icon: '🎉' },
  ];

  const benefits = [
    { icon: '👥', title: '海量曝光', desc: '10万+精准用户' },
    { icon: '💰', title: '免费推广', desc: '平台流量扶持' },
    { icon: '📊', title: '数据支持', desc: '经营数据分析' },
    { icon: '💳', title: '快速结算', desc: 'T+1到账' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#8BC34A] to-[#689F38] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h1 className="text-4xl font-bold text-white mb-3 font-serif">商家入驻</h1>
          <p className="text-white/80 text-lg mb-6">加入「小新带你游汕头」，让更多用户发现您的店铺</p>
          <Link href="#apply" className="inline-flex px-8 py-4 bg-white text-[#8BC34A] rounded-full font-bold hover:shadow-lg transition-all">
            立即申请入驻
          </Link>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#2D3436] mb-12 font-serif">入驻流程</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#E8E8E8]"></div>
              )}
              <div className="w-16 h-16 mx-auto mb-4 bg-[#8BC34A] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {step.icon}
              </div>
              <div className="text-[#8BC34A] font-bold mb-1">{step.title}</div>
              <p className="text-sm text-[#636E72]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#2D3436] mb-12 font-serif">平台优势</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="text-center p-6 bg-[#FFFDF7] rounded-xl">
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-[#2D3436] mb-1">{b.title}</h3>
                <p className="text-sm text-[#636E72]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Form */}
      <div id="apply" className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#2D3436] mb-4 font-serif">商家申请</h2>
        <p className="text-center text-[#636E72] mb-8">提交以下信息，我们的客服会尽快与您联系</p>
        
        <form className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2D3436] mb-2">商家名称 *</label>
              <input type="text" required className="w-full h-12 px-4 border border-[#E8E8E8] rounded-lg focus:border-[#8BC34A] focus:ring-1 focus:ring-[#8BC34A] outline-none transition-colors" placeholder="请输入商家名称" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D3436] mb-2">行业分类 *</label>
              <select className="w-full h-12 px-4 border border-[#E8E8E8] rounded-lg focus:border-[#8BC34A] outline-none">
                <option>请选择行业</option>
                <option>美食餐饮</option>
                <option>住宿民宿</option>
                <option>休闲娱乐</option>
                <option>生活服务</option>
                <option>其他</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2D3436] mb-2">联系人 *</label>
              <input type="text" required className="w-full h-12 px-4 border border-[#E8E8E8] rounded-lg focus:border-[#8BC34A] outline-none" placeholder="请输入联系人姓名" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D3436] mb-2">联系电话 *</label>
              <input type="tel" required className="w-full h-12 px-4 border border-[#E8E8E8] rounded-lg focus:border-[#8BC34A] outline-none" placeholder="请输入联系电话" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">商家地址</label>
            <input type="text" className="w-full h-12 px-4 border border-[#E8E8E8] rounded-lg focus:border-[#8BC34A] outline-none" placeholder="请输入商家地址" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D3436] mb-2">商家简介</label>
            <textarea className="w-full h-32 px-4 py-3 border border-[#E8E8E8] rounded-lg focus:border-[#8BC34A] outline-none resize-none" placeholder="请简单介绍您的商家"></textarea>
          </div>

          <button type="submit" className="w-full h-14 bg-gradient-to-r from-[#8BC34A] to-[#689F38] text-white rounded-lg font-bold hover:shadow-lg transition-all">
            提交申请
          </button>
        </form>
      </div>
    </div>
  );
}
