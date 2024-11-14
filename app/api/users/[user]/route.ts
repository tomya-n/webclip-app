import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("error");
  }
}

export async function GET(req: Request, { params }: { params: { user: string } }) {
  try {
    const clipData = await prisma.clipData.findMany({
      where: {
        user: params.user,
      },
      include: {
        tags: true,
      },
    });
    console.log(clipData);
    console.log(params.user);

    return NextResponse.json({ clipData });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}
