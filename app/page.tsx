import AddForm from "./components/AddForm";
import ClipItem from "./components/ClipItem";

export default async function Home() {
  const res = await fetch(`http://localhost:5555/clipData`, {
    cache: "no-cache",
  });
  const clipData = await res.json();
  // console.log(clipData);

  return (
    <>
      <ul className="basis-11/12">
        <ClipItem clipData={clipData} />
      </ul>
      <AddForm />
    </>
  );
}
