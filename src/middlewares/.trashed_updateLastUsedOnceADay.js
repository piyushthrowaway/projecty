import prisma from "../utils/prismaClient.js";
//very risky to use, as it is very heavy and can cause performance issues
const updateLastUsedOnceADay = async (ctx, next) => {
  const userId = Number(ctx.from.id);

  const user = await prisma.user.findUnique({
    where: { userId },
  });

  const lastUsed = new Date(user.lastUsed);
  const now = new Date();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  if (now - lastUsed >= oneDayInMilliseconds) {
    await prisma.user.update({
      where: { userId },
      data: {
        lastUsed: now,
      },
    });
    console.log("User's last used time updated");
  }

  await next();
};

export default updateLastUsedOnceADay;
