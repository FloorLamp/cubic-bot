import { Markup } from "telegraf";
import { formatResponse } from "./format";
import { runTasks } from "./tasks";
import { bot } from "./telegram";

const keyboard = Markup.keyboard(["/prices"]).resize();

bot.start((ctx) =>
  ctx.reply("This bot will give you the latest Cubic prices", keyboard)
);
bot.help((ctx) =>
  ctx.reply(`I can get the latest Cubic prices.
/prices Get latest prices`)
);

bot.command("prices", async (ctx) => {
  ctx.reply(formatResponse(), {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  });
});

bot.launch();

// Run tasks every 20s
setInterval(runTasks, 20 * 1000);
runTasks();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
