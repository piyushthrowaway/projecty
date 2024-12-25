import prisma from "../utils/prismaClient.js";

export default function photoHandler(bot) {
  bot.on("message:photo", async (ctx) => {
    const message = ctx.message;
    const photoArray = ctx.message.photo;
    const largestPhoto = photoArray[photoArray.length - 1];
    const smallestPhoto = photoArray[0];
    const title = largestPhoto.file_unique_id;
    const photoId = largestPhoto.file_id;
    const size = largestPhoto.file_size;
    const tags = ctx.message.caption ? ctx.message.caption.split(",") : [];

    console.log(message);
    console.log("Received photo with ID:", photoId);
    console.log("Title:", title);
    console.log("Tags:", tags);

    try {
      await prisma.photo.create({
        data: {
          photoId,
          title,
          tags,
          size,
          thumbnail: smallestPhoto,
        },
      });
      console.log("Photo added to database successfully");
      await ctx.reply(
        `Photo with id : ${photoId} added successfully to database`
      );
    } catch (error) {
      console.error("Error adding photo to database:", error);
      await ctx.reply("Failed to add photo");
    }
  });
}
