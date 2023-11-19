import ClipItem from "./components/ClipItem";

export default async function Home() {
  const res = await fetch(`http://localhost:3000/api`, {
    cache: "no-cache",
  });
  const clipData = await res.json();

  return (
    <>
      <ul className="basis-11/12">
        <ClipItem clipData={clipData.clipData} />
      </ul>
    </>
  );
}
