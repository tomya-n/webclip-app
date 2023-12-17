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
    const tagData = await prisma.tags.findMany();
    return NextResponse.json({ tagData });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}
