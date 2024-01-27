import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { JSDOM } from "jsdom";

const prisma = new PrismaClient();

type FormatData = {
  title: string;
  description: string;
  url: string;
  tags?: string[];
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const queryUrl = searchParams.get("url");

  const queryUrlResponse = await fetch(queryUrl);
  const body = await queryUrlResponse.text();
  const dom = new JSDOM(body);
  const document = dom.window.document;
  const metaData = [];

  const metaElements = document.querySelectorAll("meta");
  metaElements.forEach((meta) => {
    const name = meta.getAttribute("name") || meta.getAttribute("property");
    const content = meta.getAttribute("content");
    if (name && content) {
      // `og:` がついているものは、それを取り除いて登録
      const cleanedName = name.startsWith("og:") ? name.slice(3) : name;
      metaData.push({ name: cleanedName, content });
    }
  });

  // 必要なメタデータのみをフィルタリング
  const filteredMetaData = metaData.filter((item) => ["title", "url", "description"].includes(item.name));

  // データ構造を整形
  const formattedMetaData: FormatData = { title: "", url: "", description: "", tags: ["test"] };
  filteredMetaData.forEach(({ name, content }) => {
    formattedMetaData[name] = content;
  });
  console.log(formattedMetaData);

  // const filteredMetaData = metaData.reduce((acc, item) => {
  //   const isOG = item.name.startsWith("og:");
  //   const baseName = isOG ? item.name.slice(3) : item.name;
  //   const baseExists = acc.some((el) => el.name === baseName);
  //   const ogExists = acc.some((el) => el.name === `og:${baseName}`);

  //   if (!isOG && !ogExists) {
  //     acc.push(item);
  //   } else if (isOG && !baseExists) {
  //     acc.push(item);
  //   }

  //   return acc;
  // }, []);

  // const filterMetaData = filteredMetaData
  //   .filter((item) => item.name === "title" || item.name === "og:title" || item.name === "url" || item.name === "og:url" || item.name === "description" || item.name === "og:description")
  //   .sort((a, b) => {
  //     const aIsOG = a.name.startsWith("og:");
  //     const bIsOG = b.name.startsWith("og:");
  //     return aIsOG === bIsOG ? 0 : aIsOG ? -1 : 1;
  //   });
  // console.log(filterMetaData);

  const { title, url, description, tags } = formattedMetaData;
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

  return NextResponse.json({ formattedMetaData }, { headers: corsHeaders });
}
