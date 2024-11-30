import Link from "next/link";
import { Tag } from "../@types/index.d";


// ビルド時はダミーデータを使用
const dummyTagData: Tag[] = [
  { id: 1 ,name: "Next.js" },
  { id: 2 , name: "React" },
  { id: 3 , name: "Docker" }
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default async function Home() {
  // const res = await fetch(`${API_URL}/api/tags`, {
  //   cache: "no-cache",
  // });
  // if (!res.ok) throw new Error("エラー発生！");
  // const { tagData } = await res.json();
  // const tagName = await tagData.map((tag: Tag) => {
  //   return tag.name;
  // });

  // 本番環境ではダミーデータを使用
  const tagData = process.env.NODE_ENV === 'production' 
    ? dummyTagData 
    : await fetchTagData();
  
  const tagName = tagData.map((tag: Tag) => tag.name);

  return (
    <>
      <div>タグ一覧</div>
      <ul className="flex">
        {tagName.map((tag: string, index: number) => (
          <li key={index} className="mr-1">
            <Link className="underline hover:no-underline inline-block" href={`/tags/${tag}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// 開発環境用のfetch関数
async function fetchTagData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/tags`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("エラー発生！");
  const { tagData } = await res.json();
  return tagData;
}