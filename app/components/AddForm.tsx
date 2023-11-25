"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

type postData = {
  title: string;
  url: string;
  description: string;
  tags: string;
};

const AddForm = () => {
  const router = useRouter();

  const [data, setData] = useState<postData>({
    title: "",
    url: "",
    description: "",
    tags: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(data);
  };

  const onSubmitHandler = async (e: React.MouseEvent) => {
    e.preventDefault();

    const newTags = data.tags.split(",");
    const newData = { ...data, tags: newTags };
    console.log(newData);

    const res = await fetch(`http://localhost:3000/api`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    setData({ title: "", url: "", description: "", tags: "" });
    router.push("/");
    router.refresh();

    return res.json();
  };

  return (
    <div className="fixed bottom-8 left-0 bg-blue-600 p-8 w-full">
      <form method="post" onSubmit={onSubmitHandler}>
        <input className="mr-5 outline-none" value={data.title} onChange={onChangeHandler} type="text" name="title" placeholder="Title" />
        <input className="mr-5 outline-none" value={data.url} onChange={onChangeHandler} type="text" name="url" placeholder="URL" />
        <input className="mr-5 outline-none" value={data.description} onChange={onChangeHandler} type="text" name="description" placeholder="Description" />
        <input className="mr-5 outline-none" value={data.tags} onChange={onChangeHandler} type="text" name="tags" placeholder="タグ (,で区切る)" />
        <button className="mr-5 bg-white" type="submit">
          追加する
        </button>
      </form>
    </div>
  );
};

export default AddForm;
