"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

import { ClipData } from "../@types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ClipItem({ clipData = [] }: { clipData: ClipData[] }) {
  const router = useRouter();
  const [isBookmarked, setBookmarked] = useState(clipData.map((data) => data.bookmarked));

  const toggleBookmark = (index: number) => {
    const newBookmark = [...isBookmarked];
    newBookmark[index] = !newBookmark[index];
    setBookmarked(newBookmark);

    const { id, bookmarked } = clipData[index];
    fetch(`${API_URL}/api`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, bookmarked }),
    });
  };

  const deleteBookmark = (index: number) => {
    const { id } = clipData[index];
    fetch(`${API_URL}/api`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {clipData.map((data, index) => (
        <li key={data.createdAt} className="clipItem shadow-lg rounded-md mb-3 p-2 transition-all relative">
          <div className="clipData">
            <Link href={data.url} target="_blank" className="underline hover:no-underline inline-block">
              <h3 className="clipTitle text-base">{data.title}</h3>
            </Link>
            <p className="clipDescription text-xs w-11/12 line-clamp-1">{data.description}</p>
            <div className="flex justify-between mt-3">
              <ul className="flex">
                {Array.isArray(data.tags)
                  ? data.tags.map((tag, tagIndex) => (
                      <li key={tagIndex} className="pr-1 font-thin text-sm">
                        <Link href={`/tags/${tag.name}`} className="hover:underline bg-slate-200 px-1">
                          {tag.name}
                        </Link>
                      </li>
                    ))
                  : null}
              </ul>
              <span className="clipDate text-xs text-gray-300">{data.createdAt}</span>
            </div>
          </div>
          <div className="actions flex absolute top-3 right-3">
            <div className="bookmark text-xl mr-2 hover:cursor-pointer" onClick={() => toggleBookmark(index)}>
              <FontAwesomeIcon icon={faCheck} style={{ color: data.bookmarked ? "#ff2e2e" : "#bfc9d9" }} />
            </div>
            <div className="delete text-xl hover:cursor-pointer" onClick={() => deleteBookmark(index)}>
              <FontAwesomeIcon icon={faTrash} style={{ color: "#bfc9d9" }} />
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
