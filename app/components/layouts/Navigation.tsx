import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <>
      <ul className="flex">
        <li className="text-xs">
          <Link href={"/tags"}>Tag一覧</Link>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
