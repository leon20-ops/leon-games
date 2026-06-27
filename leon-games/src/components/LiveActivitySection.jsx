import React, { useState } from "react";
import { faker } from "@faker-js/faker";

// --- DYNAMIC ACTIVITY FEED GENERATOR ---
const GAMES_AND_ACTIONS = [
  { name: "Rock Paper Scissors ✊", actions: ["Flawless Bluff 🧠", "Match Winner 🏆", "Double Stake Win 💎", "Daily Streak 🔥"] },
  { name: "Penalty Shootout ⚽", actions: ["Golden Boot 🥇", "Perfect Goalkeeper 🧤", "Decisive Penalty 🎯", "High-Roller Win 💰"] },
  { name: "Reaction Challenge ⏱️", actions: ["Reflex God ⭐", "Latency Defier ⚡", "0.12s Response 🟢", "Streak Maintained 🔥"] },
  { name: "Tic Tac Toe ❌", actions: ["Grandmaster Play 🧩", "Matrix Solved 📐", "Victory Royal 🏆", "Escrow Win 🔒"] },
  { name: "Number Prediction 🔢", actions: ["Perfect Proximity 🔮", "Data Analyst 📊", "Close-Range Win 🎯", "Lobby Sweeper 🚀"] }
];

const createFakeActivity = () => {
  const selectedGame = faker.helpers.arrayElement(GAMES_AND_ACTIONS);
  const action = faker.helpers.arrayElement(selectedGame.actions);
  const baseAmount = faker.number.int({ min: 10, max: 480 });

  // Format username with letters, underscores, and numbers
  const rawUser = faker.internet.username();
  const cleanUser = rawUser.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  const numSuffix = faker.number.int({ min: 11, max: 999 });
  const player = `${cleanUser}_${numSuffix}`;

  return {
    id: faker.string.uuid(),
    player,
    game: `${selectedGame.name} // ${action}`,
    amount: baseAmount,
    time: faker.helpers.arrayElement(["Just now", "1m ago", "2m ago", "3m ago", "4m ago"])
  };
};

export function LiveActivitySection() {
  // Initialize with 30 unique dynamic items
  const [feed, setFeed] = useState(() =>
    Array.from({ length: 30 }, () => createFakeActivity())
  );

  const handleLoopReset = () => {
    // Regenerate a completely fresh set of 30 unique items at the exact frame the loop resets
    setFeed(Array.from({ length: 30 }, () => createFakeActivity()));
  };

  return (
    <section className="py-12 bg-[#050505] overflow-hidden border-b border-white/[0.04] z-10">
      <div className="w-full flex flex-col gap-4">
        <div className="text-center mb-2">
          <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-black flex items-center justify-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            🔴 Live Arena Action
          </span>
        </div>

        {/* Infinite Marquee Feed Container */}
        <div className="relative flex overflow-x-hidden w-full group mask-gradient">
          <div
            onAnimationIteration={handleLoopReset} // Intercepts the loop reset frame to swap data seamlessly
            className="animate-marquee flex whitespace-nowrap gap-6 py-2"
          >
            {feed.concat(feed).map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="inline-flex items-center gap-3 bg-[#111111] border border-white/[0.06] rounded-full py-2.5 px-6 shadow-md transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-white">{item.player}</span>
                <span className="text-[10px] text-neutral-500 uppercase font-bold">{item.game}</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  +${item.amount}.00
                </span>
                <span className="text-[9px] text-neutral-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}