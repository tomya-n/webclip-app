import Link from "next/link";
import Navigation from "./Navigation";

export const Header = () => {
  return (
    <>
      <header className="flex bg-blue-600 text-slate-50 py-4 pl-3 pr-3 text-lg font-bold mb-5">
        <h1 className="pr-20">
          <Link href={"http://localhost:3000"}>Webclip Application</Link>
        </h1>
        <Navigation />
      </header>
    </>
  );
};
