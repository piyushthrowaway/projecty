import prisma from "../utils/prismaClient.js";
import { getLangNameFromCode, getLangCodeList } from "language-name-map";
import pointsCommand from "./points.js";
const startCommand = (bot) => {
  bot.command("start", async (ctx) => {
    // Get the user ID and language code from the context
    const userId = Number(ctx.from.id);
    let referrerId = 0; // Referral userId from /start command
    if (ctx.match) {
      referrerId = Number(ctx.match);
    }
    let lang;
    try {
      lang = getLangNameFromCode(ctx.from.language_code).name;
    } catch (error) {
      lang = "English";
    }

    // Check if the user already exists in the database
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (user) {
      ctx.reply("You are already registered!");
    } else {
      // Create a new user
      // add points to the referrer if the referrer exists
      if (referrerId) {
        //check if referrer exists
        const referrer = await prisma.user.findUnique({
          where: {
            userId: referrerId,
          },
        });
        if (!referrer) {
          ctx.reply("Invalid referral code.");
          referrerId = 0;
        }
        if (referrer) {
          // Add referral points
          try {
            await prisma.user.update({
              where: {
                userId: referrerId,
              },
              data: {
                points: {
                  increment: 5,
                },
                referralCount: {
                  increment: 1,
                },
              },
            });

            // Send a message to the referrer by their id
            const referrerChat = await bot.api.getChat(referrerId);
            await bot.api.sendMessage(
              referrerId,
              `Referral successful! You've earned 5 points.`
            );
            console.log(`User ${userId} has been referred by ${referrerId}`);
          } catch (error) {
            console.error("Error updating referrer:", error);
            // ctx.reply("An error occurred. Please try again later.");
          }
        }
      }

      //try to update commandusage json with /video key by 1

      // Add the user to the database
      try {
        await prisma.user.create({
          data: {
            userId,
            // if referrerId exists, add 20 points to the user else 10
            points: referrerId != 0 ? 20 : 10,

            language: lang,
            //referredby is the referrerId to string if it exists, otherwise it is Marketting
            referredBy: referrerId,

            // referredBy: referrerId ? referrerId : "Marketting",
          },
        });
        // Send a welcome message if the user is referred
        if (referrerId) {
          ctx.reply(
            `Welcome to the bot! You've been registered with 20 points because you were referred.`
          );
        } else {
          ctx.reply(
            "Welcome to the bot! You've been registered with 10 points."
          );
        }
      } catch (error) {
        console.error("Error creating user:", error);
        ctx.reply("An error occurred. Please try again later.");
      }
    }
  });
};

export default startCommand;
