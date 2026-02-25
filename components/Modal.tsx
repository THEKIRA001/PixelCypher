"use client";

import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState, type ReactNode } from "react";
import { text } from "node:stream/consumers";

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export default function Modal({ title, open, onClose, children }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-4 w-[min(1100px,90vw)] h-[min(80vh,760px)] rounded-2xl border border-neutral-700 bg-base-900/90 shadow-glow animate-in">
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800">
          <div className="text-base font-semibold">{title}</div>
          <button aria-label="Close" onClick={onClose} id="button_popup" className=" btn-ghost  h-8 w-8 p-0 rounded-lg text-base-200 hover:text-white flex items-center justify-center">
            <X className="h-4 w-4 text-white"  strokeWidth={2.5}/>
          </button>
        </div>
        <div className="p-5 h-[calc(100%-88px)] overflow-auto">
          <div className="h-full rounded-xl border border-neutral-800 bg-base-900" />
          {children}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-lg border border-neutral-800 bg-base-900/90 px-3 py-1 text-xs text-base-300">{title}</div>
      </div>
    </div>,
    document.body
  );
}
