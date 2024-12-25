export default function videoCommand(bot) {
  bot.command("video", async (ctx) => {
    const videoId =
      "BAACAgUAAxkBAAIDemdkEtIgR6knT3IT5a_FRA-e-Sn7AAJuFQACYVQgV2lkqLsAAeN7ZzYE";
    //sends a video to the user with the caption "Here is a video!"
    await ctx.reply("Processing video...");
    await ctx.replyWithVideo(videoId, { caption: "Here is a video!" });
    await ctx.reply("Video sent successfully!");
  });
}
