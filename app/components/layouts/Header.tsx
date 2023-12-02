import Link from "next/link";

export const Header = () => {
  return (
    <>
      <h1 className="bg-blue-600 text-slate-50 py-4 pl-3 text-lg font-bold mb-5">
        <Link href={"http://localhost:3000"}>Webclip Application</Link>
      </h1>
    </>
  );
};
