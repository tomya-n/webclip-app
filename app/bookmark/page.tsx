import Link from "next/link";
import ClipItem from "../components/ClipItem";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ビルド時はダミーデータを使用
const dummyBookmarkData = [
  { id: 1, title: "サンプルブックマーク1" },
  { id: 2, title: "サンプルブックマーク2" }
];

export default async function Home() {
  // const res = await fetch(`${API_URL}/api/bookmark`, {
  //   cache: "no-cache",
  // });
  // if (!res.ok) throw new Error("エラー発生！");
  // const { bookmark } = await res.json();

  // 本番環境ではダミーデータを使用
  const bookmark = process.env.NODE_ENV === 'production' 
    ? dummyBookmarkData 
    : await fetchBookmarkData();

  return (
    <>
      <div>ブクマの中のブクマ一覧</div>
      <ul className="basis-11/12">
        <ClipItem clipData={bookmark} />
      </ul>
    </>
  );
}

// 開発環境用のfetch関数
async function fetchBookmarkData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/bookmark`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("エラー発生！");
  const { bookmark } = await res.json();
  return bookmark;
}