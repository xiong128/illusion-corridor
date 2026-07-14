import { Message } from "./ai";

const CHAT_STORAGE_PREFIX = "mhy_chat_";

export function loadMessages(characterId: string): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CHAT_STORAGE_PREFIX + characterId);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveMessages(characterId: string, messages: Message[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      CHAT_STORAGE_PREFIX + characterId,
      JSON.stringify(messages)
    );
  } catch {
    // localStorage 满或不可用
  }
}

export function clearMessages(characterId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CHAT_STORAGE_PREFIX + characterId);
  } catch {
    // ignore
  }
}

export function getAllChatHistories(): {
  characterId: string;
  lastMessage: string;
  count: number;
  timestamp: number;
}[] {
  if (typeof window === "undefined") return [];
  try {
    const histories: { characterId: string; lastMessage: string; count: number; timestamp: number }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CHAT_STORAGE_PREFIX)) {
        const characterId = key.replace(CHAT_STORAGE_PREFIX, "");
        const data = JSON.parse(localStorage.getItem(key) || "[]") as Message[];
        if (data.length > 0) {
          histories.push({
            characterId,
            lastMessage: data[data.length - 1].content.slice(0, 50),
            count: data.length,
            timestamp: data[data.length - 1].timestamp,
          });
        }
      }
    }
    return histories.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}