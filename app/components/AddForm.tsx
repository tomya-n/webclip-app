"use client";

import React, { ChangeEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type postData = {
  title: string;
  url: string;
  description: string;
  tags: string;
};

const AddForm = () => {
  const [data, setData] = useState<postData>({
    title: "",
    url: "",
    description: "",
    tags: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(data);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTags = data.tags.split(" ");
    const newData = { ...data, tags: newTags };
    console.log("newdata", newData);

    try {
      const resNewData = await fetch(`${API_URL}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      await resNewData.json();
    } catch (error) {
      console.error(error);
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
