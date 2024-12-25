const specifiedCommands = ["/help", "/points", "/start", "/refer"];

const checkCommand = async (ctx, next) => {
  try {
    const messageText = ctx.message.text;
    const command = messageText.split(" ")[0]; // Get the command used
    const command2 = messageText.split("@")[0]; // Get the command used
    
    if (
      specifiedCommands.includes(command) ||
      specifiedCommands.includes(command2)
    ) {
      // If the command is specified, proceed to the next middleware
      await next();
    } else {
      // If the command is not specified, send a warning text
      await ctx.reply(
        `Warning: This command is not recognized.`
      );
    }
  } catch (error) {
    console.error("Error processing command:", error);
    await ctx.reply(
      "There was an error processing your command. Please check your input and try again."
    );
  }
};

export default checkCommand;