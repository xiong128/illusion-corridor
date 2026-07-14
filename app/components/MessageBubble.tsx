"use client";

import { Message } from "@/lib/ai";
import { Character } from "@/data/characters";

export default function MessageBubble({
  message,
  character,
}: {
  message: Message;
  character: Character;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-enter flex gap-3 mb-4 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* 头像 */}
      <div
        className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-lg ${
          isUser
            ? "bg-gradient-to-br from-indigo-500 to-purple-600"
            : `bg-gradient-to-br ${character.gradient}`
        }`}
      >
        {isUser ? "🧑" : character.avatar}
      </div>

      {/* 消息内容 */}
      <div
        className={`max-w-[75%] sm:max-w-[65%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border border-indigo-500/20 rounded-tr-md"
            : "glass-panel rounded-tl-md"
        }`}
      >
        {/* 角色名 */}
        {!isUser && (
          <p className="text-xs text-gray-500 mb-1">{character.name}</p>
        )}
        <p className="text-gray-200 whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <p className="text-[10px] text-gray-600 mt-1.5">
          {new Date(message.timestamp).toLocaleTimeString("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}