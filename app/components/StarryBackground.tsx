"use client";

import { useEffect, useRef } from "react";

export default function StarryBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const stars: HTMLDivElement[] = [];
    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.width = Math.random() * 3 + 1 + "px";
      star.style.height = star.style.width;
      star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
      star.style.setProperty("--delay", Math.random() * 5 + "s");
      container.appendChild(star);
      stars.push(star);
    }

    return () => {
      stars.forEach((s) => s.remove());
    };
  }, []);

  return <div ref={ref} className="starry-bg" />;
}