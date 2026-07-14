import type { Metadata } from "next";
import "./globals.css";
import StarryBackground from "./components/StarryBackground";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "幻境回廊 — AI虚拟角色对话平台",
  description: "米哈游风格AI角色互动系统，与二次元角色对话",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <StarryBackground />
        <Navbar />
        <main className="relative z-10 max-w-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
