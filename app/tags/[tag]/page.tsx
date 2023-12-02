export default function Home({ params }: { params: { tag: string } }) {
  return (
    <>
      <div>{params.tag}の一覧</div>
    </>
  );
}
