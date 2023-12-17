import Link from "next/link";
import { Tag } from "../@types/index.d";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/tags", {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("エラー発生！");
  const { tagData } = await res.json();
  const tagName = await tagData.map((tag: Tag) => {
    return tag.name;
  });

  return (
    <>
      <div>タグ一覧</div>
      <ul className="flex">
        {tagName.map((tag: string, index: number) => (
          <li key={index} className="mr-1">
            <Link className="underline hover:no-underline inline-block" href={`http://localhost:3000/tags/${tag}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
