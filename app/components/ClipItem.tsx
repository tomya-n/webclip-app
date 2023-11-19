"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { ClipData } from "../@types";

export default function ClipItem({ clipData }: { clipData: ClipData[] }) {
  const [isBookmarked, setBookmarked] = useState(clipData.map((data) => data.bookmarked));

  const toggleBookmark = (index: number) => {
    console.log(index);
    const newBookmark = [...isBookmarked];
    newBookmark[index] = !newBookmark[index];
    console.log(newBookmark);
    console.log((clipData[index].bookmarked = newBookmark[index]));
    setBookmarked(newBookmark);

    const { id, bookmarked } = clipData[index];

    fetch(`http://localhost:3000/api`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, bookmarked }),
    });
  };

  return (
    <>
      {clipData.map((data, index) => (
        <li key={data.createdAt} className="clipItem shadow-lg rounded-md mb-3 p-2 hover:bg-gray-100 transition-all relative">
          <Link href={data.url} target="_blank">
            <div className="clipData">
              <h3 className="clipTitle text-base">{data.title}</h3>
              <p className="clipDescription text-xs w-11/12 line-clamp-1">{data.description}</p>
              <span className="clipDate text-sm text-gray-400">{data.createdAt}</span>
            </div>
          </Link>
          <div className="bookmark w-5 absolute top-3 right-3" onClick={() => toggleBookmark(index)}>
            <FontAwesomeIcon icon={faCheck} style={{ color: isBookmarked[index] ? "#ff2e2e" : "#bfc9d9" }} />
          </div>
        </li>
      ))}
    </>
  );
}
