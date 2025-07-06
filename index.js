import { Command } from "commander";
import { scheduleCommand } from "./commands/schedule.js";
import { runNowCommand } from "./commands/run-now.js";
import { listCommand } from "./commands/list.js";
import pkg from "./package.json" assert { type: "json" };

const program = new Command();

program
  .name("backup-scheduler")
  .description("CLI local for automate backups")
  .version(pkg.version);

program.addCommand(scheduleCommand);
program.addCommand(runNowCommand);
program.addCommand(listCommand);

program.parse(process.argv);
