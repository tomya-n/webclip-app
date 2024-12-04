import Link from "next/link";
import Navigation from "./Navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const Header = () => {
  return (
    <>
      <header className="flex bg-stone-950 text-slate-50 py-4 pl-3 pr-3 text-lg font-bold mb-5">
        <h1 className="pr-20 flex items-center">
          <Link href={`${API_URL}`}>みんなdeブックマーク</Link>
        </h1>
        <Navigation />
      </header>
    </>
  );
};
