import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ClipData } from "../@types/index";

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
    const clipData = await prisma.clipData.findMany({
      include: {
        tags: true,
      },
    });
    console.log(clipData);

    return NextResponse.json({ clipData });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request, res: NextResponse) {
  const { title, url, description, tags } = await req.json();
  try {
    const post = await prisma.clipData.create({
      data: {
        title,
        description,
        url,
        bookmarked: false,
        archived: false,
        user: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request, res: NextResponse) {
  const { id, bookmarked } = await req.json();

  try {
    const updateItem = await prisma.clipData.update({
      where: {
        id,
      },
      data: {
        bookmarked,
      },
    });
    return NextResponse.json({ updateItem });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request, res: NextResponse) {
  const { id } = await req.json();

  try {
    const deleteItem = await prisma.clipData.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ deleteItem });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}
