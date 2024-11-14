import Link from "next/link";
import Navigation from "./Navigation";

export const Header = () => {
  return (
    <>
      <header className="flex bg-stone-950 text-slate-50 py-4 pl-3 pr-3 text-lg font-bold mb-5">
        <h1 className="pr-20 flex items-center">
          <Link href={"http://localhost:3000"}>みんなdeブックマーク</Link>
        </h1>
        <Navigation />
      </header>
    </>
  );
};
