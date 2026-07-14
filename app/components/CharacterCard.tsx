"use client";

import Link from "next/link";
import { Character, elementIcons, elementNames, elementClass } from "@/data/characters";

function StarRating({ count }: { count: number }) {
  return (
    <span className="star-rating text-sm">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <Link href={`/character/${character.id}`}>
      <div className="glass-panel glass-panel-hover p-5 cursor-pointer group h-full flex flex-col">
        {/* 头像区域 */}
        <div className="relative mb-4">
          <div
            className={`w-full aspect-square rounded-xl bg-gradient-to-br ${character.gradient} flex items-center justify-center text-6xl relative overflow-hidden`}
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">
              {character.avatar}
            </span>
            {/* 光晕效果 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* 顶部光点 */}
            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-white/30 blur-sm animate-twinkle" />
          </div>

          {/* 元素徽章 */}
          <div className="absolute -bottom-2 left-3">
            <span className={`element-badge ${elementClass[character.element]}`}>
              {elementIcons[character.element]} {elementNames[character.element]}
            </span>
          </div>
        </div>

        {/* 名称和称号 */}
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg leading-tight">
            {character.name}
          </h3>
          <p className="text-gray-400 text-xs mt-0.5 mb-2">{character.title}</p>
          <StarRating count={character.stars} />
        </div>

        {/* 角色简介 */}
        <p className="text-gray-500 text-xs mt-3 line-clamp-2 leading-relaxed">
          {character.personality.slice(0, 60)}...
        </p>

        {/* 底部指示 */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-600">
          <span>点击开始对话</span>
          <span className="text-indigo-400/60 group-hover:text-indigo-400 transition-colors">→</span>
        </div>
      </div>
    </Link>
  );
}