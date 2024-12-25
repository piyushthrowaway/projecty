export default function videoCommand(bot) {
  bot.command("gif", async (ctx) => {
    const gifId =
      "BAACAgUAAxkBAAIDemdkEtIgR6knT3IT5a_FRA-e-Sn7AAJuFQACYVQgV2lkqLsAAeN7ZzYE";
    await ctx.replyWithAnimation(gifId, { caption: "" });
    // await ctx.reply("Video sent successfully!");
    // points notifier for the user
  });
}
