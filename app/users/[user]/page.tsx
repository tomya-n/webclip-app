import ClipItem from "../../components/ClipItem";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Home({ params }: { params: { user: string } }) {
  const res = await fetch(`${API_URL}/api/users/${params.user}`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("エラー発生！");

  const { clipData } = await res.json();
  console.log(clipData);

  return (
    <>
      <div className="mb-5">{params.user}さんのクリップ一覧</div>
      <ul>
        <ClipItem clipData={clipData} />
      </ul>
    </>
  );
}
