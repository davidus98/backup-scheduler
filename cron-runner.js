import cron from "node-cron";
import { getJobs } from "./utils/fileHelpers.js";
import { runBackupNow } from "./utils/backupRunner.js";

console.log("📆 Starting backup scheduler...");

const jobs = await getJobs();

if (jobs.length === 0) {
  console.log("❌ No scheduled jobs found.");
  process.exit(0);
}

jobs.forEach((job) => {
  console.log(`⏳ Scheduling: ${job.path} @ ${job.cron}`);

  cron.schedule(job.cron, async () => {
    console.log(`🚀 Running scheduled backup for: ${job.path}`);
    await runBackupNow(job.path);
  });
});
