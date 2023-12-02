export default function Home({ params }: { params: { id: string } }) {
  return (
    <>
      <div>{params.id}さんのクリップ一覧</div>
    </>
  );
}
