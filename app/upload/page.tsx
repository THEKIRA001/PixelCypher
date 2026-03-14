"use client";

import { useRef, useState } from "react";
import { uploadVideo } from "@/lib/s3";
import { Upload, CheckCircle, AlertCircle, Film } from "lucide-react";
import Link from "next/link";

type Status = "idle" | "uploading" | "success" | "error";

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [s3Key, setS3Key] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(f: File) {
    if (!f.type.startsWith("video/")) {
      setError("Only video files are allowed.");
      return;
    }
    setFile(f);
    const ext = f.name.split(".").pop();
    setCustomName(f.name.replace(/\.[^.]+$/, "")); // prefill with original name
    setStatus("idle");
    setError(null);
    setS3Key(null);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  async function handleUpload() {
    if (!file) return;
    setStatus("uploading");
    setError(null);
    try {
      const ext = file.name.split(".").pop();
      const filename = `${customName.trim() || file.name.replace(/\.[^.]+$/, "")}.${ext}`;
      const key = await uploadVideo(file, filename);
      setS3Key(key);
      setStatus("success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setStatus("error");
    }
  }

  return (
    <main className="flex flex-col main-container bg-linear-gradient p-5 gap-4 cursor-default overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-base-900 border border-neutral-800 shadow-glow text-xl font-bold">
            {"<PC>"}
          </div>
          <div className="flex flex-col">
            <div className="text-m scale-y-25 font-start2p font-bold tracking-wider leading-[1.1]">
              PIXELCYPHER <br /> STUDIO
            </div>
            <div className="text-[11px] font-semibold">Upload Video</div>
          </div>
        </div>
        <Link href="/" className="btn">HOME</Link>
      </header>

      {/* Upload area */}
      <section className="flex-1 flex flex-col gap-3">
        <div
          className="container-card flex flex-col items-center justify-center gap-4 p-10 cursor-pointer"
          style={{ borderStyle: dragging ? "solid" : undefined, minHeight: 220 }}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={onInputChange}
          />
          {file ? (
            <div className="flex flex-col items-center gap-2">
              <Film className="h-8 w-8 text-base-300" />
              <div className="text-sm font-semibold">{file.name}</div>
              <div className="text-[11px] text-base-400">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </div>
              <div className="text-[10px] text-base-400">Click to change file</div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-base-400" />
              <div className="text-sm font-semibold">Drop a video here</div>
              <div className="text-[11px] text-base-400">or click to browse</div>
            </div>
          )}
        </div>

        {/* Custom name input */}
        {file && (
          <div className="container-card px-4 py-3 flex flex-col gap-1">
            <div className="text-[11px] text-base-400">File name (without extension)</div>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="bg-transparent text-sm outline-none border-b border-neutral-700 pb-1 focus:border-neutral-400 transition-colors"
              placeholder="Enter file name"
            />
          </div>
        )}

        {/* Status messages */}
        {status === "success" && s3Key && (
          <div className="container-card p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Upload successful
            </div>
            <div className="text-[11px] text-base-400">S3 Key (save this to fetch your video later):</div>
            <code className="text-[11px] bg-base-900 border border-neutral-800 rounded-lg px-3 py-2 break-all">
              {s3Key}
            </code>
          </div>
        )}

        {status === "error" && error && (
          <div className="container-card p-4 flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload button */}
        <button
          className="btn w-full py-3 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
        >
          {status === "uploading" ? "UPLOADING..." : "UPLOAD TO S3"}
        </button>
      </section>
    </main>
  );
}
