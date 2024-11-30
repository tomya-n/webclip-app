import AddForm from "./components/AddForm";
import ClipItem from "./components/ClipItem";
import { useRouter } from "next/router";
import { fetchData } from "./utils/fetchData";

const API_URL = process.env.API_URL;

export default async function Home() {
  try{
    const res = await fetch(`${API_URL}/api`, {cache: "no-cache"});
    if (!res.ok) throw new Error("エラー発生！");
    const { clipData } = await res.json();

    return (
      <>
        <ul className="basis-11/12">
          <ClipItem clipData={clipData} />
        </ul>
        <AddForm />
      </>
    );  
  } catch {
    return <p>Failed to load data.</p>;
  }


}
