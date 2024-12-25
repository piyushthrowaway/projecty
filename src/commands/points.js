import prisma from "../utils/prismaClient.js";

export default async function pointsCommand(bot) {
  bot.command("points", async (ctx) => {
    const userId = ctx.from.id;
    try {
      const user = await prisma.user.findUnique({
        where: { userId },
      });
      return ctx.reply(`You have ${user.points} points.`);
    } catch (error) {
      console.error(error);
      return ctx.reply(
        "An error occurred while fetching your points, please try again later or contact support."
      );
    }
  });
}
