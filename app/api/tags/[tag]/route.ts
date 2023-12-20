import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error();
  }
}

export async function GET(req: NextRequest, { params }: { params: { tag: string } }) {
  try {
    const clipData = await prisma.clipData.findMany({
      where: {
        tags: {
          some: {
            name: params.tag,
          },
        },
      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json({ clipData });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}
