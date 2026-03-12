'use client';

import Link from 'next/link';
import { orderData, userData } from '@/lib/data';

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '待支付', color: 'bg-[#FF9800]' },
  paid: { label: '已支付', color: 'bg-[#2196F3]' },
  completed: { label: '已完成', color: 'bg-[#4CAF50]' },
  cancelled: { label: '已取消', color: 'bg-[#9E9E9E]' },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* User Header */}
      <div className="bg-gradient-to-r from-[#00BCD4] to-[#0097A7] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-4xl">
              {userData.avatar ? (
                <img src={userData.avatar} alt={userData.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                '👤'
              )}
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
              <p className="text-white/80">{userData.phone}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-[#FFE66D] text-[#2D3436] text-sm rounded-full font-medium">
                  {userData.memberLevel}
                </span>
                <span className="text-sm text-white/80">积分: {userData.points}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '📋', label: '我的订单', href: '#orders' },
            { icon: '❤️', label: '我的收藏', href: '#favorites' },
            { icon: '💳', label: '优惠券', href: '#coupons' },
            { icon: '⚙️', label: '账号设置', href: '#settings' },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-sm font-medium text-[#2D3436]">{item.label}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Order Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 border-b border-[#E8E8E8] mb-6">
          {['全部', '待支付', '已支付', '已完成'].map((tab) => (
            <button key={tab} className={`px-4 py-2 font-medium border-b-2 transition-colors ${tab === '全部' ? 'border-[#00BCD4] text-[#00BCD4]' : 'border-transparent text-[#636E72] hover:text-[#00BCD4]'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orderData.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
              <img src={order.image} alt={order.item} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#2D3436]">{order.item}</h3>
                  <span className={`px-3 py-1 text-white text-xs rounded-full ${statusMap[order.status].color}`}>
                    {statusMap[order.status].label}
                  </span>
                </div>
                <p className="text-sm text-[#636E72] mb-2">订单号: {order.id}</p>
                <p className="text-sm text-[#636E72] mb-2">{order.date}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#00BCD4] font-bold">{order.amount}</span>
                  <button className="px-4 py-2 border border-[#00BCD4] text-[#00BCD4] rounded-full text-sm hover:bg-[#00BCD4] hover:text-white transition-colors">
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
