import Link from "next/link";

export default async function Home() {
  const res = await fetch(`http://localhost:5555/tags`, {
    cache: "no-cache",
  });
  const tags = await res.json();
  const tagFlat: string[] = Array.from(new Set(tags.flat()));

  return (
    <>
      <div>タグ一覧</div>
      <ul className="flex">
        {tagFlat.map((tag: string, index: number) => (
          <li key={index} className="mr-1">
            <Link className="underline hover:no-underline inline-block" href={`http://localhost:3000/tags/${tag}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
