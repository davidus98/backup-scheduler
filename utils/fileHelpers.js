import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the jobs.json file
const jobsFile = path.join(__dirname, "..", "data", "jobs.json");

// Create folder if it doesn't exist
await fs.ensureFile(jobsFile);

/**
 * Get all saved jobs from the local file
 */
export async function getJobs() {
  try {
    if (!(await fs.pathExists(jobsFile))) return [];
    const jobs = await fs.readJson(jobsFile);
    return Array.isArray(jobs) ? jobs : [];
  } catch (err) {
    console.error("❌ Error reading jobs.json:", err.message);
    return [];
  }
}

/**
 * Save a new job to jobs.json
 */
export async function saveJob(job) {
  const jobs = await getJobs();
  jobs.push(job);
  await fs.outputJson(jobsFile, jobs, { spaces: 2 });
}
