import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { JSDOM } from "jsdom";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*", // 必要に応じて特定のオリジンに制限可能
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const queryUrl = searchParams.get("url");

  if (!queryUrl) {
    return NextResponse.json(
      { error: "The 'url' query parameter is missing or invalid." },
      { status: 400 }
    );
  }

  try {
    const queryUrlResponse = await fetch(queryUrl);
    const body = await queryUrlResponse.text();
    const dom = new JSDOM(body);
    const document = dom.window.document;

    const metaData: any[] = [];
    const metaElements = document.querySelectorAll("meta");

    metaElements.forEach((meta) => {
      const name = meta.getAttribute("name") || meta.getAttribute("property");
      const content = meta.getAttribute("content");
      if (name && content) {
        const cleanedName = name.startsWith("og:") ? name.slice(3) : name;
        metaData.push({ name: cleanedName, content });
      }
    });

    const filteredMetaData = metaData.filter((item) =>
      ["title", "url", "description"].includes(item.name)
    );

    const formattedMetaData = {
      title: "",
      url: "",
      description: "",
      tags: ["あとで読むらしい"],
    };

    filteredMetaData.forEach(({ name, content }) => {
      (formattedMetaData as any)[name] = content;
    });

    return NextResponse.json({ metaData: formattedMetaData });
  } catch (error) {
    console.error("Error in GET /api/add:", error);
    return NextResponse.json({error: "Error occurred while processing the data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  
  const headers = {
    "Access-Control-Allow-Origin": "*", // 必要に応じて制限する
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  try {
    const body = await req.json();
    const { title, url, description, tags } = body;

    const post = await prisma.clipData.create({
      data: {
        title,
        url,
        description,
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

    return new Response(JSON.stringify({ post }), { headers });
    
  } catch (error) {
    console.error("Error in POST /api/add:", error);
    return NextResponse.json({ error: "Error occurred while processing the data" }, { status: 500,headers });
  } finally {
    await prisma.$disconnect();
  }
}

