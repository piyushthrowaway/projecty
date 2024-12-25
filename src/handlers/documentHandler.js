import prisma from "../utils/prismaClient.js";

export default function documentHandler(bot) {
  bot.on("message:document", async (ctx) => {
    const document = ctx.message.document;
    if (
      ctx.message.document &&
      ctx.message.document.mime_type.startsWith("image/")
    ) {
      console.log("Image");
      const photoId = document.file_id;
      const size = document.file_size / 1024 / 1024;
      const title = document.file_unique_id;
      const tags = ctx.message.caption ? ctx.message.caption.split(",") : [];
      const thumbnail = document.thumb ? document.thumb : document.thumbnail;
      try {
        await prisma.photo.create({
          data: {
            photoId,
            title,
            tags,
            size,
            thumbnail,
          },
        });
      } catch {
        await ctx.reply("Failed to add photo");
      }
      await ctx.reply("Photo added successfully");
    }

    if (document.mime_type && document.mime_type.startsWith("video/")) {
      const videoId = document.file_id;
      const size = document.file_size / 1024 / 1024;
      const title = document.file_unique_id + " " + document.file_name;
      const tags = ctx.message.caption.split(",") || [];
      const thumbnail = document.thumb ? document.thumb : document.thumbnail;
      const duration = document.duration;

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
      } catch {
        await ctx.reply("Failed to add video");
      }
      await ctx.reply("Video added successfully");
    }
  });
}
