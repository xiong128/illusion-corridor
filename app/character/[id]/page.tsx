"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { characters, elementIcons, elementNames, elementClass } from "@/data/characters";
import ChatInterface from "@/app/components/ChatInterface";

export default function CharacterChatPage() {
  const { id } = useParams<{ id: string }>();
  const character = characters.find((c) => c.id === id);

  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-4xl mb-4">🔮</p>
        <h2 className="text-xl font-bold text-white mb-2">角色不存在</h2>
        <p className="text-gray-500 mb-6">你似乎闯入了一片未知的领域...</p>
        <Link href="/" className="mhy-btn mhy-btn-primary">
          <ArrowLeft size={16} />
          返回角色大厅
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          返回角色大厅
        </Link>

        {/* 角色信息条 */}
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-lg`}
          >
            {character.avatar}
          </div>
          <div className="text-right">
            <p className="text-white font-semibold text-sm">{character.name}</p>
            <p className="text-gray-500 text-xs">{character.title}</p>
          </div>
        </div>
      </div>

      {/* 聊天卡片 */}
      <div className="glass-panel p-2 sm:p-4 overflow-hidden">
        <ChatInterface character={character} />
      </div>

      {/* 角色详情 */}
      <div className="mt-6 glass-panel p-5 animate-slide-up">
        <div className="flex flex-wrap gap-4 items-start">
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${character.gradient} flex items-center justify-center text-3xl flex-shrink-0`}
          >
            {character.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-lg font-bold text-white">{character.name}</h3>
              <span className={`element-badge ${elementClass[character.element]}`}>
                {elementIcons[character.element]} {elementNames[character.element]}
              </span>
              <span className="star-rating text-xs">
                {"★".repeat(character.stars)}
              </span>
            </div>
            <p className="text-gray-500 text-xs mb-3">{character.title}</p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="text-gray-400 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Heart size={14} className="text-pink-400" />
                  性格特征
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {character.personality}
                </p>
              </div>
              <div>
                <h4 className="text-gray-400 font-semibold mb-1.5 flex items-center gap-1.5">
                  📖 背景故事
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {character.background}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}