import { Command } from "commander";
import { runBackupNow } from "../utils/backupRunner.js";

export const runNowCommand = new Command("run-now")
  .description("Run a back up")
  .requiredOption("-p, --path <path>", "Path for the folder to backup")
  .action(async (opts) => {
    await runBackupNow(opts.path);
  });
