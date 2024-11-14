import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <>
      <ul className="flex">
        <li className="text-xm m-2">
          <Link href={"/tags"}>タグリスト</Link>
        </li>
        <li className="text-xm m-2">
          <Link href={"/bookmark"}>ブクマ</Link>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
