import ClipItem from "../../components/ClipItem";
import { ClipData } from "../../@types/index.d";

export default async function Home({ params }: { params: { tag: string } }) {
  const resClipData = await fetch(`http://localhost:5432/clipData`, {
    cache: "no-cache",
  });
  const clipData = await resClipData.json();
  const filterClipData: ClipData[] = [];
  clipData.filter((clip) => (clip.tags.includes(params.tag) ? filterClipData.push(clip) : null));
  // const res = await fetch(`http://localhost:5555/tags/${params.tag}`, {
  //   cache: "no-cache",
  // });

  console.log(clipData);
  console.log(filterClipData);

  return (
    <>
      <div>{params.tag}の一覧</div>
      <ul className="basis-11/12">
        <ClipItem clipData={filterClipData} />
      </ul>
    </>
  );
}
