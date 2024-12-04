"use client";

import Link from "next/link";
import ClipItem from "../components/ClipItem";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const data = [
  {id: 1,
    title: "aaaaa",
    description: "bbbbbbbbbb",
    url: "http://localhost:3001/",
    bookmarked: true,
    tags: [{id: 1,name: "a"},{id: 2,name: "b"},{id: 3,name: "c"},],
    archived: true,
    user: "admin",
    createdAt: "2021-10-08T12:30:30.002Z",
    updatedAt: "2021-10-08T12:30:30.002Z"
  },
  {id: 2,
    title: "aaaaa",
    description: "bbbbbbbbbb",
    url: "http://localhost:3001/",
    bookmarked: false,
    tags: [{id: 1,name: "a"},{id: 2,name: "b"},{id: 3,name: "c"},],
    archived: true,
    user: "admin",
    createdAt: "2021-10-08T12:30:30.002Z",
    updatedAt: "2021-10-08T12:30:30.002Z"
  }
];

export default async function Home() {
  
  const bookmark = process.env.NODE_ENV === 'production' 
    ? data
    : await fetchClipData();

  return (
    <>
      <div>ブクマの中のブクマ一覧</div>
      <ul className="basis-11/12">
        <ClipItem clipData={bookmark} />
      </ul>
    </>
  );
}


async function fetchClipData() {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/api/bookmark`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("エラー発生！");
  const { bookmark } = await res.json();
  return bookmark;
}