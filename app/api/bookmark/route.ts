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

export async function GET(req: Request, res: NextResponse) {
  try {
    const bookmark = await prisma.clipData.findMany({
      where: {
        bookmarked: true,
      },
    });

    return NextResponse.json({ bookmark });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}
