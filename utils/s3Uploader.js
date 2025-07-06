import { Client } from "minio";
import dotenv from "dotenv";

dotenv.config();

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

export async function uploadToMinio(filePath, destinationKey) {
  const bucket = process.env.MINIO_BUCKET;

  // Ensure the bucket exists
  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    await minioClient.makeBucket(bucket, "us-east-1");
    console.log(`✅ Created bucket: ${bucket}`);
  }

  const contentType = "application/zip"; // assumed for zipped backups

  await minioClient.fPutObject(bucket, destinationKey, filePath, {
    "Content-Type": contentType,
  });

  console.log(`✅ Backup uploaded to MinIO: ${bucket}/${destinationKey}`);
}
