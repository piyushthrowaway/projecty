import Config from "../config/config.js";
Config();

// array of allowed group ids
const ALLOWED_GROUP_ID = process.env.ALLOWED_GROUP_ID?.split(", ").map((id) =>
  Number(id)
);
console.log(ALLOWED_GROUP_ID);
export default async function checkGroup(ctx, next) {
  const chatType = ctx.chat?.type;
  const chatId = ctx.chat?.id;
  console.log(ALLOWED_GROUP_ID.includes(chatId));

  // Allow personal chats
  if (chatType === "private" || ALLOWED_GROUP_ID.includes(chatId)) {
    return next(); // Continue processing private chat messages
  } else {
    await ctx.reply(
      "This group is not allowed to use this bot. Please contact the bot owner for more information." +
        chatId
    );
  }
}
