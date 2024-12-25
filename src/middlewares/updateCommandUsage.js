import prisma from "../utils/prismaClient.js";

const updateCommandUsage = async (ctx, next) => {
  const userId = Number(ctx.from.id);
  const command = ctx.message.text.split(" ")[0]; // Get the command used

  try {
    // Fetch the current commandUsage
    const user = await prisma.user.findUnique({
      where: { userId },
      select: { commandUsage: true },
    });

    if (user) {
      // Parse the commandUsage JSON
      const commandUsage = user.commandUsage;

      // Increment the command count
      commandUsage[command] = (commandUsage[command] || 0) + 1;

      // Update the user with the new commandUsage
      await prisma.user.update({
        where: { userId },
        data: { commandUsage: commandUsage },
      });

      console.log(`Incremented ${command} count for user ${userId}`);
    } else {
      console.log(`User with userId ${userId} not found`);
    }
  } catch (error) {
    console.error("Error updating command usage:", error);
  }

  // Call the next middleware in the stack
  await next();
};

export default updateCommandUsage;
