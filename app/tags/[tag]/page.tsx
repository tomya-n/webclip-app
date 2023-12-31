import ClipItem from "../../components/ClipItem";
import { ClipData } from "../../@types/index.d";

export default async function Home({ params }: { params: { tag: string } }) {
  const res = await fetch(`http://localhost:3000/api/tags/${params.tag}`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("エラー発生！");

  const { clipData } = await res.json();
  console.log(clipData);

  return (
    <>
      <div className="mb-5">{params.tag}の一覧</div>
      <ul>
        <ClipItem clipData={clipData} />
      </ul>
    </>
  );
}
