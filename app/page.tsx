import Link from "next/link";
import Image from "next/image";
import { ClipData } from "./@types/index";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api?");
  if (!response.ok) throw new Error("error dayo");
  const clipData = await response.json();

  return (
    <>
      <div className="basis-4/12">
        <ul>
          <li>
            <a href="/">TOP</a>
          </li>
          <li>
            <Link href="/user01/pages">/[id]/page ユーザーアイテム一覧</Link>
          </li>
          <li>
            <Link href="/user01/favorites">/[id]/favorites ユーザーお気に入り一覧</Link>
          </li>
          <li>
            <Link href="/user01/tags">/[id]/tags ユーザーが設定したタグ一覧</Link>
          </li>
          <li>
            <Link href="/user01/tags/tag_name">/[id]/tags/tag_name ユーザーが設定したタグのページ一覧</Link>
          </li>
        </ul>
      </div>
      <div className="basis-8/12 flex">
        <ul>
          {clipData.map((data: ClipData) => (
            <li key={data.date} className="clipItem">
              <Link href={data.url}>
                <div className="clipThumb">
                  <Image src={data.imageUrl} width={150} height={150} alt="test" />
                </div>
                <div className="clipData">
                  <h3 className="clipTitle">{data.title}</h3>
                  <p className="clipDescription">{data.description}</p>
                  <span className="clipDate">{data.date}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
