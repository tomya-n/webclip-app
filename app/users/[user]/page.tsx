import ClipItem from "../../components/ClipItem";

export default async function Home({ params }: { params: { user: string } }) {
  const res = await fetch(`http://localhost:3000/api/users/${params.user}`, {
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
