import prisma from "../utils/prismaClient.js";

export default async function checkRegistration(ctx, next) {
  const userId = ctx.from.id;

  if (!ctx.message || !ctx.message.text) {
    await ctx.reply("Invalid message format.");
    return;
  }

  const command = ctx.message.text.split(" ")[0].replace("/", "");
  console.log(command);

  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });
    if (user) {
      // User is registered, proceed to the next middleware
      return next();
    } else if (command == "start") {
      // User is not registered, but is trying to register
      return next();
    } else {
      // User is not registered, send a message
      await ctx.reply(
        "You are not registered. Please use /start to use this bot."
      );
    }
  } catch (error) {
    console.error("Error checking registration:", error);
    await ctx.reply(
      "An error occurred while checking your registration. Please try again later."
    );
  }
}
