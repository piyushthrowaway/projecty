export default function videoCommand(bot) {
  bot.command("photo", async (ctx) => {
    const photoId =
      "AgACAgUAAxkBAAID1GdkZSGfp__7d3sEOlAIOZjK65uFAALoxDEbYVQgVwkt1HYSKl_7AQADAgADeQADNgQ"; // Ensure this is a valid photoId
    //sends a video to the user with the caption "Here is a video!"

    await ctx.replyWithPhoto(photoId, { caption: "Here is a photo!" });
    await ctx.reply("Photo sent successfully!");
  });
}
