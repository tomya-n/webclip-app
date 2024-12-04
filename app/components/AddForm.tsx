"use client";

import React, { ChangeEvent, useState } from "react";
import { ClipData } from "../@types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || undefined;

type postData = {
  title: string;
  url: string;
  description: string;
  tags: string;
};

type AddFormProps = {
  onAddClip: (newClip: {
    title: string;
    url: string;
    description: string;
    tags: string[];
  }) => void;
};

const AddForm = ({onAddClip}: AddFormProps) => {
  const [data, setData] = useState<postData>({
    title: "",
    url: "",
    description: "",
    tags: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTags = data.tags.split(" ").filter((tag) => tag !== "");
    const newData = { ...data, tags: newTags };

    console.log("送信するデータ:", newData); // 送信前のデバッグログ
    
    try {
      const res = await fetch(`${API_URL}/api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!res.ok) {
        console.error("エラーが発生しました:", res.statusText);
      } else {
        const result = await res.json();
        // 親コンポーネントに新しいクリップデータを通知
        console.log("APIレスポンス:", result); // レスポンスデータを確認
        onAddClip(result);
      }
    } catch (error) {
      console.error("送信エラー:", error);
    } finally {
      setData({ title: "", url: "", description: "", tags: "" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 bg-stone-950 p-8 w-full">
      <form method="post" onSubmit={onSubmitHandler}>
        <input className="mr-5 outline-none" value={data.title} onChange={onChangeHandler} type="text" name="title" placeholder="Title" />
        <input className="mr-5 outline-none" value={data.url} onChange={onChangeHandler} type="text" name="url" placeholder="URL" />
        <input className="mr-5 outline-none" value={data.description} onChange={onChangeHandler} type="text" name="description" placeholder="Description" />
        <input className="mr-5 outline-none" value={data.tags} onChange={onChangeHandler} type="text" name="tags" placeholder="スペースで区切る" />
        <button className="mr-5 bg-white" type="submit">
          追加する
        </button>
      </form>
    </div>
  );
};

export default AddForm;
