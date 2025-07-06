import { Command } from "commander";
import { getJobs } from "../utils/fileHelpers.js";

export const listCommand = new Command("list")
  .description("List all the backups programmed")
  .action(async () => {
    const jobs = await getJobs();
    if (jobs.length === 0) {
      console.log("❌ No backup programmed.");
      return;
    }

    jobs.forEach((job) => {
      console.log(`📦 ${job.path} @ ${job.cron} (id: ${job.id})`);
    });
  });
