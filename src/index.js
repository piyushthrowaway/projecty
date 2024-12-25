// import dotenv from "dotenv";
import Config from "./config/config.js";
import { bot } from "./bot.js";
// import { PrismaClient } from "../src/utils/prismaClient.js";

Config();

// Start the bot
bot.start();
console.log("Bot is running...");
