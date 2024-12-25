import prisma from "../utils/prismaClient.js";

export default function gifHandler(bot) {
  bot.on("message:animation", async (ctx) => {
    const gifId = ctx.message.animation.file_id;
    const title =
      ctx.message.animation.file_name +
      " " +
      ctx.message.animation.file_unique_id;
    const size = ctx.message.animation.file_size;
    const tags = ctx.message.caption ? ctx.message.caption.split(",") : [];
    const thumbnail = ctx.message.animation.thumb
      ? ctx.message.animation.thumb
      : ctx.message.animation.thumbnail;

    await ctx.reply(`Gif received! \n\nProcessing gif...`);
    try {
      await prisma.gif.create({
        data: {
          gifId,
          title,
          size,
          tags,
          thumbnail,
        },
      });
      await ctx.reply(`Gif added successfully to database`);
    } catch (error) {
      console.error("Error adding photo to database:", error);
      await ctx.reply("Failed to add photo");
    }
    console.log(
      `Processing gif with ID: ${gifId}, Size: ${size}, Title: ${title}`
    );
  });
}
