"use client";

import { useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { Play } from "lucide-react";
import clsx from "clsx";

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const open = (t: string) => setModalTitle(t);
  const close = () => setModalTitle(null);

  const serviceGroups = [
    {
      title: "Branding & identity systems",
      items: [
        { title: "Logo systems", subtitle: "Brand guides & usage" },
        { title: "Visual identity", subtitle: "Colour & imagery" },
        { title: "Typography", subtitle: "Type pairs & rhythm" },
        { title: "Brand toolkit", subtitle: "Templates & assets" },
      ],
    },
    {
      title: "Social & promotional video edits",
      items: [
        { title: "Shorts", subtitle: "Snappy edits" },
        { title: "Reels", subtitle: "Vertical motion" },
        { title: "Promo", subtitle: "Launch & hype" },
        { title: "Storyboards", subtitle: "Cut planning" },
      ],
    },
    {
      title: "Web design & landing pages",
      items: [
        { title: "Landing pages", subtitle: "High-converting" },
        { title: "Portfolio", subtitle: "Creator-first" },
        { title: "Micro-sites", subtitle: "Fast & focused" },
        { title: "CMS", subtitle: "Easy updates" },
      ],
    },
  ];

  const tags = ["Branding", "Promotion", "Landing", "Social", "Explainer", "Logo Anim"];

  return (
    <main className="container-max mx-auto px-4 py-6 sm:py-10">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-base-900 border border-neutral-800 shadow-glow text-xl font-bold">{"<PC>"}</div>
          <div>
            <div className={"text-xl font-semibold tracking-wide"}>PIXELCYPHER</div>
            <div className="-mt-1 text-sm text-base-400">Branding • Video Editing • Website Design</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-base-400">{year}</div>
          <a href="mailto:pixelcypherstudio@gmail.com" className="btn btn-primary">LET'S TALK</a>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="card p-5 sm:p-6">
            <div className="mb-3 text-2xl font-extrabold tracking-wide">WE MAKE LOUD, CLEAN BRANDS</div>
            <p className="mb-4 max-w-xl text-base-400">PixelCypher Studio crafts pixel-perfect branding, edits cinematic videos, and ships clean, fast websites tailored to small businesses and creators. We keep the look minimal, the impact maximal.</p>

            <div className="space-y-3">
              {serviceGroups.map((g, i) => (
                <details key={i} className="group rounded-xl border border-neutral-800 bg-base-900/70 shadow-tile">
                  <summary className="list-none cursor-pointer select-none px-4 py-3 text-base flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-base-300" />
                    <span className="font-medium">{g.title}</span>
                    <span className="ml-auto text-sm text-base-400 group-open:hidden">expand</span>
                    <span className="ml-auto text-sm text-base-400 hidden group-open:inline">collapse</span>
                  </summary>
                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {g.items.map((it, j) => (
                        <button
                          key={j}
                          onClick={() => open(it.title)}
                          className="tile p-4 text-left transition hover:bg-base-800/60"
                        >
                          <div className="h-24 rounded-lg bg-gradient-to-b from-base-800/60 to-base-900 mb-3" />
                          <div className="text-sm font-semibold">{it.title}</div>
                          <div className="text-xs text-base-400">{it.subtitle}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
              <div className="px-1 text-xs text-base-400">Fast turnaround · Fixed-price packages available</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-3">
          <div className="card aspect-video grid place-items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-neutral-700 bg-base-900"><Play className="h-4 w-4" /></div>
              <div className="text-xs text-base-400">Video Edit Preview</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tags.map((t) => (
              <button key={t} onClick={() => open(t)} className="tile px-3 py-4 text-sm font-medium text-base-300 transition hover:bg-base-800/60">
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-neutral-900 pt-6 text-sm text-base-400 sm:flex-row">
        <div>
          <div className="font-semibold text-base-200">LET'S BUILD</div>
          <a className="hover:underline" href="mailto:pixelcypherstudio@gmail.com">pixelcypherstudio@gmail.com</a>
        </div>
        <div className="sm:text-right">
          <div className="font-semibold text-base-200">FOLLOW</div>
          <a className="hover:underline" href="https://instagram.com/pixelcypherstudio" target="_blank" rel="noreferrer">@pixelcypherstudio</a>
        </div>
      </footer>

      <Modal title={modalTitle ?? ""} open={!!modalTitle} onClose={close} />
    </main>
  );
}
