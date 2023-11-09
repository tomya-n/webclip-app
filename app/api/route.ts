import { NextResponse } from "next/server";
import { ClipData } from "../@types/index";

const clipData: ClipData[] = [
  {
    title: "testData1",
    url: "http://xxx.com",
    description: "testdescription",
    date: "2023-11-01",
    memo: "メモ",
    imageUrl: "/asset/img/img01.png",
  },
];

export function GET() {
  return NextResponse.json(clipData);
}
