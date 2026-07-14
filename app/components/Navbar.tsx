"use client";

import Link from "next/link";
import { MessageCircle, Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel rounded-none border-t-0 border-x-0">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg group-hover:animate-pulse-glow transition-all">
            ✦
          </div>
          <div>
            <h1 className="text-gradient-gold font-bold text-lg tracking-wide">
              幻境回廊
            </h1>
            <p className="text-xs text-gray-500 -mt-1">AI Character Chat</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="mhy-btn mhy-btn-ghost text-sm py-2 px-3"
          >
            <Home size={16} />
            <span className="hidden sm:inline">角色大厅</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}