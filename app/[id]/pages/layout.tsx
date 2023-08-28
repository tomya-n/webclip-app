import { Sidebar } from "@/app/components/layouts/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Item / WebClip App",
  description: "ユーザーアイテム一覧",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
