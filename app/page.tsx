"use client";

import { useState } from "react";
import CharacterCard from "./components/CharacterCard";
import { characters } from "@/data/characters";
import { Search, Sparkles } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = characters.filter(
    (c) =>
      c.name.includes(search) ||
      c.title.includes(search) ||
      c.personality.includes(search)
  );

  const fiveStars = filtered.filter((c) => c.stars === 5);
  const fourStars = filtered.filter((c) => c.stars === 4);

  return (
    <div className="animate-fade-in px-4 max-w-6xl mx-auto pt-20 pb-10">
      {/* 标题区域 */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <Sparkles size={20} className="text-indigo-400" />
          <span className="text-xs text-indigo-400 tracking-widest uppercase">
            AI Character Chat
          </span>
          <Sparkles size={20} className="text-indigo-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gradient-gold mb-3">
          幻境回廊
        </h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
          在这片星海之中，七位来自不同世界的角色正等待与你相遇。
          选择一位，开启属于你们的对话吧。
        </p>
      </div>

      {/* 搜索栏 */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索角色名称、称号或特征..."
            className="mhy-input pl-11"
          />
        </div>
      </div>

      {/* 五星角色 */}
      {fiveStars.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
            <span className="text-yellow-400 text-sm font-semibold tracking-wider flex items-center gap-1">
              ★★★★★ 五星传说
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {fiveStars.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>
      )}

      {/* 四星角色 */}
      {fourStars.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
            <span className="text-purple-400 text-sm font-semibold tracking-wider flex items-center gap-1">
              ★★★★ 四星精英
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {fourStars.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>
      )}

      {/* 空结果 */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-2">未找到匹配的角色</p>
          <p className="text-gray-600 text-sm">试试其他关键词？</p>
        </div>
      )}

      {/* 页脚 */}
      <footer className="text-center mt-16 pb-6">
        <p className="text-xs text-gray-700">
          ✦ 幻境回廊 · AI虚拟角色对话平台 · 仅供学习交流 ✦
        </p>
        <p className="text-[10px] text-gray-800 mt-1">
          所有角色均为原创虚构，与任何作品无关
        </p>
      </footer>
    </div>
  );
}
