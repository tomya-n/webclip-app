import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ClipData } from "../@types/index";

const prisma = new PrismaClient();

// async function main() {
//   try {
//     await prisma.$connect();
//   } catch (error) {
//     return Error("error");
//   }
// }

export async function GET(req: Request, res: NextResponse) {
  try {
    const clipData = await prisma.clipData.findMany();

    return NextResponse.json({ clipData });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request, res: NextResponse) {
  const { id, bookmarked } = await req.json();

  const updateUser = await prisma.clipData.update({
    where: {
      id,
    },
    data: {
      bookmarked,
    },
  });
}
