import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET!,
    Prefix: "videos/",
  });

  const { Contents } = await s3.send(command);

  const videos = (Contents ?? [])
    .filter((obj) => obj.Key && obj.Key !== "videos/")
    .map((obj) => ({
      key: obj.Key!,
      name: obj.Key!.replace("videos/", "").replace(/^\d+-/, ""), // strip prefix & timestamp
      size: obj.Size,
      lastModified: obj.LastModified,
    }));

  return NextResponse.json({ videos });
}
