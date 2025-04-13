import Button from "@/app/components/elements/Button";
import React from "react";

function Resizing({
  title,
  setTitle,
  portion,
  setPortion,
  csv,
  setCsv,
  resize,
  setResize,
}: {
  title: string;
  setTitle: any;
  portion: string;
  setPortion: any;
  csv: string;
  setCsv: any;
  resize: number;
  setResize: any;
}) {
  return (
    <div
      // className="px-auto mx-auto"
      className="px-auto mx-auto"
    >
      <div className="">
        <label htmlFor="title" className="block font-bold mb-1 mx-2 text-sm">
          レシピ名
          <input
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-1 w-full"
          ></input>
        </label>
      </div>
      <div className="">
        <label htmlFor="portion" className="block font-bold mb-1 mx-2 text-sm">
          分量
          <input
            name="portion"
            id="portion"
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-2 w-full
            "
          />
        </label>
      </div>
      <textarea
        name="csvデータ"
        id="csv1"
        cols={30}
        rows={10}
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        className="border border-gray-300 rounded p-2 mx-auto w-full"
      ></textarea>
      <Button size={"small"}>データを保存</Button>
      <div className="mt-1 mb-1 flex items-center justify-center">
        <span className="mt-">全体量を</span>
        <input
          type="number"
          id="resize"
          value={resize}
          onChange={(e) => setResize(e.target.value)}
          step="0.5"
          className="[appearance:textfield] [&::-webkit-outer-spin-button] [&::-webkit-inner-spin-button] border border-gray-300 rounded p-2 w-10 ml-2"
        />
        <span className="ml-2">倍にする</span>
      </div>
    </div>
  );
}

export default Resizing;
