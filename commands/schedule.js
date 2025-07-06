import { Command } from "commander";
import { saveJob } from "../utils/fileHelpers.js";

export const scheduleCommand = new Command("schedule")
  .description("Program a new backup")
  .requiredOption("-p, --path <path>", "Path for the folder to backup")
  .requiredOption("-c, --cron <cron>", "Cron Expression")
  .action(async (opts) => {
    const job = {
      id: Date.now(),
      path: opts.path,
      cron: opts.cron,
      createdAt: new Date().toISOString(),
    };
    await saveJob(job);
    console.log("✅ Backup programmed:", job);
  });
