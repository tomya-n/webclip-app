import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="basis-10/12 flex justify-center">
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
    </>
  );
}
