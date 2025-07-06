import fs from "fs-extra";
import path from "path";
import os from "os";
import archiver from "archiver";
import { uploadToMinio } from "./s3Uploader.js";

/**
 * Creates a ZIP archive from a directory
 */
export async function zipDirectory(sourceDir, outPath) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve(outPath));
    archive.finalize();
  });
}

/**
 * Runs a backup for the given folder
 */
export async function runBackupNow(sourcePath) {
  const folderName = path.basename(path.resolve(sourcePath)); // gets "test_folder"
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const zipName = `backup-${folderName}-${timestamp}.zip`;
  const tempZipPath = path.join(os.tmpdir(), zipName);

  try {
    await zipDirectory(sourcePath, tempZipPath);
    await uploadToMinio(tempZipPath, `backups/${zipName}`);
    await fs.remove(tempZipPath);
  } catch (err) {
    console.error("❌ Erorr at backup:", err.message);
  }
}
