import prisma from "../prisma";

export default async function genError(error: any) {
  await prisma.errors.create({
    data: {
      description: `${error}`
    }
  })
}