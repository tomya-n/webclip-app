import AddForm from "./components/AddForm";
import ClipItem from "./components/ClipItem";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api", {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("error dayo");

  const { clipData } = await res.json();

  return (
    <>
      <ul className="basis-11/12">
        <ClipItem clipData={clipData} />
      </ul>
      <AddForm />
    </>
  );
}
