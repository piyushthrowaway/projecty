import prisma from "../utils/prismaClient.js";

export default function videoHandler(bot) {
  bot.on("message:video", async (ctx) => {
    const videoId = ctx.message.video.file_id;
    const title =
      ctx.message.video.file_unique_id + " " + ctx.message.video.file_name;
    const size = ctx.message.video.file_size / (1024 * 1024);
    const duration = ctx.message.video.duration;
    const thumbnail = ctx.message.video.thumb
      ? ctx.message.video.thumb
      : ctx.message.video.thumbnail;
    const tags = ctx.message.caption ? ctx.message.caption.split(",") : [];

    // console.log(videoId);
    // console.log(title);
    // console.log(duration);
    // console.log(JSON.stringify(thumbnail));
    // console.log(tags);

    try {
      await prisma.video.create({
        data: {
          videoId,
          title,
          size,
          duration,
          thumbnail,
          tags,
        },
      });
      console.log(`Video with id : ${videoId} added successfully to database`);
      await ctx.reply("Video added to database successfully");
    } catch (error) {
      console.error("Error adding Video to database:", error);
      await ctx.reply("Failed to add Video");
    }
  });
}
