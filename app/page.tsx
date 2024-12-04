"use client";

import { useState, useEffect } from "react";
import AddForm from "./components/AddForm";
import ClipItem from "./components/ClipItem";
// import { useRouter } from "next/router";
// import { fetchData } from "./utils/fetchData";
import { ClipData } from "./@types/index";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const mockData:ClipData[] = [
  {id: 1,
    title: "aiueoaiueo",
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

async function fetchClipData(): Promise<ClipData[]> {
  return fetch(`${API_URL}/api/`, { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error("データ取得に失敗しました");
      return res.json();
    })
    .then((data) => data.clipData);
}

export default function Home() {
  
  const [clipData, setClipData] = useState<ClipData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =
          process.env.NODE_ENV === "production" ? await fetchClipData() : mockData;
        setClipData(data);
      } catch (err: any) {
        console.error(err.message);
        setError("データの取得に失敗しました");
      }
    };

    fetchData();
  }, []);


  const handleAddClip = (newClip: {
    title: string;
    url: string;
    description: string;
    tags: string[];
  }) => {
    const tagsArray = newClip.tags ?? [];
    const clip: ClipData = {
      id: Date.now(),
      title: newClip.title,
      url: newClip.url,
      description: newClip.description,
      tags: tagsArray.map((tag, index) => ({ id: index + 1, name: tag })),
      bookmarked: false,
      archived: false,
      user: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setClipData((prevClipData) => [...prevClipData, clip]);
  };

    return (
      <>
       {error && <p style={{ color: "red" }}>{error}</p>}
        <ul className="basis-11/12">
          <ClipItem clipData={clipData} />
        </ul>
        <AddForm onAddClip={handleAddClip} />
      </>
    );  


}