import Link from "next/link";
import ClipItem from "../components/ClipItem";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/bookmark", {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("エラー発生！");
  const { bookmark } = await res.json();

  return (
    <>
      <div>ブクマの中のブクマ一覧</div>
      <ul className="basis-11/12">
        <ClipItem clipData={bookmark} />
      </ul>
    </>
  );
}
