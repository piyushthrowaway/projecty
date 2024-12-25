import prisma from "./prismaClient.js";

//seed the database with some initial data
export default async function Seed() {
  await prisma.user.create({
    data: {
      userId: 1234,
    },
  });
}
Seed();
