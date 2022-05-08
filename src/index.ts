import "dotenv/config";
import { Telegraf } from "telegraf";
import { select } from "weighted";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (BOT_TOKEN === undefined) throw new Error("BOT_TOKEN must be provided!");

const Bot = new Telegraf(BOT_TOKEN);

const ANSWERS = {
  Yes: 0.3,
  No: 0.3,
  Hohoho: 0.2,
  Ugh: 0.15,
  Hangup: 0.05,
};

Bot.on("text", (ctx) => ctx.reply(select(ANSWERS)));

Bot.launch();

process.once("SIGINT", () => Bot.stop("SIGINT"));
process.once("SIGTERM", () => Bot.stop("SIGTERM"));
