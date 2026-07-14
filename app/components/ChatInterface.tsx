"use client";

import { useState, useRef } from "react";
import { Send, Trash2 } from "lucide-react";
import { Character } from "@/data/characters";
import { Message, generateAIReply } from "@/lib/ai";
import { loadMessages, saveMessages, clearMessages } from "@/lib/storage";
import MessageBubble from "./MessageBubble";

function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-lg">
        ...
      </div>
      <div className="glass-panel rounded-tl-md px-4 py-3">
        <div className="typing-indicator px-0 py-0">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default function ChatInterface({ character }: { character: Character }) {
  const [messages, setMessages] = useState<Message[]>(() =>
    loadMessages(character.id)
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    saveMessages(character.id, newMessages);
    setInput("");
    setIsTyping(true);

    // 模拟 AI 思考延迟
    const delay = 800 + Math.random() * 1500;
    await new Promise((r) => setTimeout(r, delay));

    const aiReply = generateAIReply(character, trimmed);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiReply,
      timestamp: Date.now(),
    };

    const finalMessages = [...newMessages, aiMsg];
    setMessages(finalMessages);
    saveMessages(character.id, finalMessages);
    setIsTyping(false);
  };

  const handleClear = () => {
    if (confirm("确定要清除与该角色的所有对话记录吗？")) {
      setMessages([]);
      clearMessages(character.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTopicClick = (topic: string) => {
    setInput(topic);
    inputRef.current?.focus();
  };

  // 如果还没有对话，显示欢迎和话题建议
  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* 对话区域 */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {showWelcome ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
            {/* 角色头像 */}
            <div
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-5xl mb-6 animate-float shadow-lg`}
            >
              {character.avatar}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {character.name}
            </h2>
            <p className="text-gray-400 text-sm mb-1">{character.title}</p>
            <p className="text-gray-500 text-xs mb-8 max-w-md leading-relaxed">
              {character.greeting}
            </p>

            {/* 建议话题 */}
            <div className="space-y-3 w-full max-w-sm">
              <p className="text-xs text-gray-600">💡 试试这些话题：</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {character.sampleTopics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => handleTopicClick(topic)}
                    className="px-4 py-2 text-xs text-gray-300 glass-panel rounded-full hover:border-indigo-500/40 hover:text-white transition-all duration-300"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                character={character}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="border-t border-white/5 pt-3 px-2">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`和 ${character.name} 说点什么...`}
            className="mhy-input flex-1"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="mhy-btn mhy-btn-primary rounded-xl px-4 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="mhy-btn mhy-btn-ghost rounded-xl px-3"
              title="清除对话"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}