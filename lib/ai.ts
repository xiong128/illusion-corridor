/// <reference types="node" />
import { Character } from "@/data/characters";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

// ===== AI 模拟引擎 =====
// 生产环境可替换为真实 AI API（OpenAI / Claude / 本地模型）

const characterReplies: Record<string, string[]> = {
  kaguya: [
    "月光是冷的，但它照亮了无数旅人的归途。你的心中，是否也有一轮明月？",
    "诗是心灵的倒影。今夜星河灿烂，不如我为你吟一首《月下独酌》……",
    "冰霜虽寒，却是我最温柔的守护。千年来，唯有这片星空未曾改变。",
    "你问我在月宫孤独吗？孤独是常态，但此刻与你交谈，倒让这长夜多了几分暖意。",
    "命运如同月相，盈缺有时。不必焦虑未来，珍惜当下便好。",
    "我曾在月之海畔种下一株银莲，千年才开一次花。下次花开时，你想来看吗？",
    "嗯……你的问题很有趣。在我漫长的岁月里，很少遇到像你这样好奇的旅人。",
    "凡人的生命短暂而璀璨，恰如流星划过夜空。正因如此，才更加珍贵。",
  ],
  ryujin: [
    "哼，实力才是这个世界唯一的通行证。想变强？先回答我——你愿意付出什么代价？",
    "雷霆万钧，不过是意志的延伸。真正的力量，来自内心的「不动」。",
    "保护想保护的人，这就是我挥刀的理由。你呢？有想要守护的东西吗？",
    "战场上没有侥幸。每一次胜利都是用血汗换来的，记住这一点。",
    "「永恒」？呵，永恒从不是静止，而是在变化中保持本心。",
    "你这家伙倒是不怕我。很好，我讨厌胆小如鼠的人。",
    "有时候我会想，如果不用战斗，世界会是什么样子……算了，不说这些。",
  ],
  sakura: [
    "嘿嘿~ 你看那朵樱花，它今天开得特别好看呢！🌸",
    "治愈的力量其实很简单——就是「真心想要对方好起来」的心意呀。",
    "啊！差点忘了给神社前的樱花树浇水了……你等等我！不对，你是来找我聊天的，嘻嘻。",
    "唱歌的时候，我会想象自己是一片花瓣，随风飘向需要温暖的地方……",
    "你知道吗？每一朵花都有自己的花语。你的花语是什么呢？",
    "虽然我有时候笨手笨脚的，但保护大家的心可是超级认真的！",
    "春天来了万物复苏，夏天蝉鸣阵阵，秋天落叶纷飞，冬天雪花飘飘——每个季节都值得被爱呀~",
  ],
  phantom: [
    "……火焰不会说谎。它只会燃烧该燃烧的东西。",
    "(长久的沉默) 你……不怕我？有意思。",
    "深渊里只有无尽的黑暗。但黑暗中也有需要守护的东西。",
    "这火焰……是诅咒，也是救赎。你不需要理解，离远点就好。",
    "猎魔不需要理由。它们伤害了太多人，这就够了。",
    "……谢谢你听我说这些。平时我不怎么说这么多话。",
    "下次战斗，如果遇到危险，站在我身后。",
  ],
  nyx: [
    "哇！你这个问题太棒了！让我查一下星象记录……啊找到了！",
    "根据古代文献记载，这颗行星每三千年才接近一次我们的世界。不可思议吧？",
    "你知道吗？我们现在看到的星光，可能是几万年前发出的。所以仰望星空，就是在看历史。",
    "命运的星盘不是用来预测的，而是用来「理解」的。理解自己的命运，才能超越它。",
    "知识的海洋无穷无尽，每次发现新东西我都兴奋得睡不着觉！",
    "在我的研究中，「风」的本质是信息的流动。风元素之所以自由，是因为它从不执着。",
  ],
  namine: [
    "嘘……你听到了吗？那是海的心跳声。🌊",
    "每个人的心中都有一片海。有人波澜壮阔，有人静谧如镜，都很美。",
    "唱歌的时候，我能感受到听众的心跳。那种共鸣……是世界上最美妙的事。",
    "深海里有一种会发光的鱼，它们在黑暗中互相照亮彼此。就像人与人之间的善意。",
    "悲伤的时候就来听我唱歌吧。让旋律带走你的忧愁，就像海浪带走沙滩上的脚印。",
    "你知道吗？水是最温柔的元素，但它也能穿透最坚硬的岩石。温柔不等于软弱哦。",
  ],
  albedo: [
    "让我分析一下……嗯，你的问题触及到了元素转换的本质原理。有趣。",
    "炼金术的第一法则：等价交换。获取什么，就要付出同等价值的东西。这个道理也适用于人生。",
    "我正在尝试将情感能量结晶化。如果成功，爱和思念就能被永久保存……你不觉得这很浪漫吗？",
    "地质结构揭示了世界的记忆。每一层岩石都是一页史书。",
    "科学和炼金术的区别？科学解释「如何」，炼金术探究「为何」。二者并无高下之分。",
    "实验失败了一百次？那说明你已经排除了一百种不可能。接近真相了。",
  ],
};

// 通用回复（当角色特定回复用完时）
const genericReplies = [
  "嗯，你继续说，我在听。",
  "这是个好问题，让我想想……",
  "有意思的观点。能详细说说吗？",
  "我明白了。那你的想法呢？",
  "嗯……让我捋一捋思绪。",
];

/**
 * 模拟AI回复生成（带随机延迟和打字效果）
 * 如需接入真实AI，将此处替换为 fetch 调用
 */
export function generateAIReply(
  character: Character,
  userMessage: string
): string {
  const replies = characterReplies[character.id] || genericReplies;

  // 关键词检测增强回应相关性
  const lowerMsg = userMessage.toLowerCase();
  const keywords: Record<string, { key: string; reply: string }[]> = {
    kaguya: [
      { key: "诗", reply: "诗者，志之所之也。在心为志，发言为诗。你想听什么样的诗呢？" },
      { key: "孤独", reply: "孤独不是惩罚，而是让灵魂沉淀的时光。我也曾独自守望千年月光。" },
      { key: "月", reply: "月有阴晴圆缺，正如人生起落。但只要抬头，它永远在那里。" },
    ],
    ryujin: [
      { key: "战斗", reply: "战斗不是目的，是手段。重要的是战斗的理由。" },
      { key: "强", reply: "真正的强者不是打败所有人，而是守护住想守护的一切。" },
      { key: "剑", reply: "剑是心的延伸。心若迷茫，剑也会迟钝。" },
    ],
    sakura: [
      { key: "花", reply: "我最喜欢樱花了！它告诉我们——美的东西不需要永恒，瞬间的灿烂就足够啦~" },
      { key: "开心", reply: "开心的事要分享才更开心！快说说你最近有什么好事？" },
      { key: "歌", reply: "想听我唱歌吗？让我想想唱哪首……啊！就唱《春风谣》吧！" },
    ],
    phantom: [
      { key: "火焰", reply: "（掌心燃起一簇火焰）这火，不会伤你。" },
      { key: "过去", reply: "……过去的事没什么好说的。重要的是现在。" },
    ],
  };

  // 尝试关键词匹配
  const charKeywords = keywords[character.id];

  if (charKeywords) {
    for (const { key, reply } of charKeywords) {
      if (lowerMsg.includes(key)) {
        return reply;
      }
    }
  }

  // 随机选择回复
  const randomIndex = Math.floor(Math.random() * replies.length);
  return replies[randomIndex];
}

/**
 * 生产环境接入真实AI API 示例
 */
export async function generateRealAIReply(
  character: Character,
  messages: Message[]
): Promise<string> {
  const systemPrompt = `你是「${character.name}」，称号「${character.title}」。
性格：${character.personality}
背景：${character.background}

请以该角色的身份和语气回复用户。回复要符合角色设定，保持角色一致性。
回复语言：中文。
回复长度：2-4句话。
${character.id === "sakura" ? "说话时可以带可爱的语气词。" : ""}
${character.id === "phantom" ? "说话极简，字数很少，沉默为主。" : ""}
${character.id === "ryujin" ? "说话霸气简洁，偶尔毒舌。" : ""}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.8,
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    throw new Error("AI API 调用失败");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}