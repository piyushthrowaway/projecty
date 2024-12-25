export default function referCommand(bot) {
  bot.command("refer", async (ctx) => {
    const userId = ctx.from.id;
    const referralLink = `https://t.me/${process.env.BOT_USERNAME}?start=${userId}`;
    await ctx.reply(
      "Refer your friends to this bot and earn points when they register!\n\n Your referral link is: " +
        referralLink +
        "\n\nYou will earn 10 points for each successful referral."
    );
  });
}
