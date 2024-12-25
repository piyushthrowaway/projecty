const cooldowns = new Map();

export default async function antiSpam(ctx, next) {
  const timeoutInSeconds = 3;
  console.log("AntiSpam middleware");
  const userId = ctx.from.id;
  const currentTime = Date.now();

  if (!cooldowns.has(userId)) {
    console.log("No cooldowns");
    cooldowns.set(userId, currentTime);
    await next(); // Allow the command to proceed
    return;
  }

  const lastCommandTime = cooldowns.get(userId);
  const timeElapsed = (currentTime - lastCommandTime) / 1000;

  if (timeElapsed < timeoutInSeconds) {
    console.log("Time elapsed is less than timeout");
    return ctx.reply(
      `You're sending commands too quickly! Please wait ${
        timeoutInSeconds - Math.floor(timeElapsed)
      } seconds.`
    );
  }

  console.log("Setting cooldowns");
  cooldowns.set(userId, currentTime);
  await next(); // Allow the command to proceed
}
