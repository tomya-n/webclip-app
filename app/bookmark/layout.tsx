import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブクマの中のブクマ",
  description: "お気に入り一覧",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-11/12">{children}</div>
    </>
  );
}
