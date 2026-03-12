import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// 艺术字体
const artisticFont = {
  variable: "--font-artistic",
  subsets: ["latin"] as const,
  weight: "400" as const,
};

export const metadata: Metadata = {
  title: "小新带你游汕头 - 吃喝玩乐不用愁！",
  description: "汕头本地生活服务平台，为您提供美食、民宿、旅游、房产、家政、招聘、运动养生等一站式服务。",
  keywords: "汕头, 美食, 旅游, 民宿, 房产, 家政, 招聘, 汕头生活",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap" rel="stylesheet" />
      </head>
      <body className={`${notoSans.variable} ${notoSerif.variable} antialiased`}>
        <Header />
        <main className="min-h-screen pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
