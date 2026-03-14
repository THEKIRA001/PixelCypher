"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Modal from "@/components/Modal";
import { Play } from "lucide-react";
import { fetchVideoUrl } from "@/lib/s3";

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    videoRef.current?.play();
    setPlaying(true);
  }

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-contain"
        preload="metadata"
        controls={playing}
      />
      {!playing && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer bg-black/40"
          onClick={handlePlay}
        >
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition">
            <Play className="h-6 w-6 fill-white ml-1" />
          </div>
          <div className="text-[11px] text-base-300">Click to play</div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/videos")
      .then((r) => r.json())
      .then(({ videos }) => {
        if (videos.length > 0) return fetchVideoUrl(videos[0].key);
      })
      .then((url) => { if (url) setVideoUrl(url); })
      .catch(() => null);
  }, []);

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
    <main className="flex flex-col main-container bg-linear-gradient p-5 gap-3 cursor-default overflow-hidden">
      <header className="h-full flex items-center justify-between">
        <div className="flex items-center justify-between gap-10">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-base-900 border border-neutral-800 shadow-glow text-xl font-bold">{"<PC>"}</div>
          <div className="flex flex-col justify-start">
            <div className={"text-m scale-y-25 font-start2p font-bold tracking-wider leading-[1.1]"}>PIXELCYPHER <br /> STUDIO</div>
            <div className="text-[11px] font-semibold">Branding • Video Editing • Website Design</div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="text-[10px] font-semibold">{year}</div>
          <a href="mailto:pixelcypherstudio@gmail.com" className="btn cursor-pointer">LET'S TALK</a>
        </div>
      </header>

      <section className="h-full w-full flex gap-5">
        <div className="container-card flex overflow-hidden">
          <div className="card p-5 sm:p-6 flex flex-col gap-3 overflow-auto">
            <div className="flex flex-col justify-start gap-1">
              <div className="text-sm font-start2p font-extrabold tracking-wide">WE MAKE LOUD, CLEAN BRANDS</div>
              <p className="text-[10px]">PixelCypher Studio crafts pixel-perfect branding, edits cinematic videos, and ships clean, fast websites tailored to small businesses and creators. We keep the look minimal, the impact maximal.</p>
            </div>
            <div className="flex flex-col gap-3">
              {serviceGroups.map((g, i) => (
                <details key={i} className="bg-linear-gradient rounded-xl border-slate">
                  <summary className="list-none cursor-pointer select-none px-4 py-3 text-base flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-base-300" />
                    <span className="text-xs font-medium">{g.title}</span>
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
        <div className="flex flex-col justify-between gap-3 container-card p-3">
          <div className="video-card transition-up cursor-pointer" onClick={() => videoUrl && setVideoModalOpen(true)}>
            <div className="h-[160px] w-[350px] flex flex-col items-center justify-center gap-2">
              {videoUrl ? (
                <div className="relative h-full w-full">
                  <video src={videoUrl} className="h-full w-full rounded object-cover" preload="metadata" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30 rounded">
                    <Play className="h-5 w-5 fill-white" />
                    <div className="text-[11px]">Video Edit Preview</div>
                  </div>
                </div>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <div className="text-[11px]">Video Edit Preview</div>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tags.map((t) => (
              <button key={t} onClick={() => open(t)} className="video-card transition-up h-[70px] w-full text-[11px] font-medium">
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="h-full flex flex-col items-start justify-between gap-3 border-t border-neutral-900 pt-6 text-sm text-base-400 sm:flex-row">
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
      <Modal title="Video Edit Preview" open={videoModalOpen} onClose={() => setVideoModalOpen(false)}>
        {videoUrl && <VideoPlayer src={videoUrl} />}
      </Modal>
    </main>
  );
}
