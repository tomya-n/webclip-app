import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
          <li className="clipItem">
            <Link href="/">
              <div className="clipThumb">
                <Image src="/asset/img/img01.png" width={150} height={150} alt="test" />
              </div>
              <div className="clipData">
                <h3 className="clipTitle">タイトル</h3>
                <p className="clipDescription">説明説明説明説明説明説明説明説明説明説明説明説明説明説明</p>
                <span className="clipDate">2023.01.01</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
