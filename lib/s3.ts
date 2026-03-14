/**
 * Upload a video file to S3.
 * Returns the S3 key (save this to reference the video later).
 */
export async function uploadVideo(file: File, filename?: string): Promise<string> {
  // 1. Get a presigned upload URL from our API
  const res = await fetch("/api/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: filename ?? file.name, contentType: file.type }),
  });

  if (!res.ok) throw new Error("Failed to get upload URL");

  const { uploadUrl, key } = await res.json();

  // 2. Upload directly to S3
  const upload = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!upload.ok) throw new Error("Upload to S3 failed");

  return key; // e.g. "videos/1234567890-myvideo.mp4"
}

/**
 * Fetch a signed URL for a video stored in S3.
 * Pass the key returned from uploadVideo().
 */
export async function fetchVideoUrl(key: string): Promise<string> {
  const res = await fetch(`/api/video-url?key=${encodeURIComponent(key)}`);

  if (!res.ok) throw new Error("Failed to get video URL");

  const { url } = await res.json();
  return url;
}
