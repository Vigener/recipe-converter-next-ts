import Button from "@/app/components/elements/Button";
import React from "react";
import { saveRecipe } from "@/features/recipes/fetchRecipes";

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
  const [url, setUrl] = React.useState("");

  /**
   * CSV形式の文字列をJSON配列に変換する関数
   * @param csv - 例: "強力粉, 260g\n薄力粉, 40g\n..."
   * @returns 例: [{ name: "強力粉", quantity: "260g" }, ...]
   */
  function csvToIngredients(csv: string): { name: string; quantity: string }[] {
    return csv
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const [name, quantity] = line.split(",").map((s) => s.trim());
        return { name, quantity };
      });
  }

  // 保存ボタンのクリック処理
  const handleSave = async () => {
    if (!title || !portion || !csv || !url) {
      alert("レシピ名、分量、CSVデータ、URLをすべて入力してください");
      return;
    }
    // CSVデータをJSON形式に変換
    const jsonData = csvToIngredients(csv);
    try {
      await saveRecipe(title, portion, jsonData, url);
      alert("レシピを保存しました");
    } catch (e) {
      alert("保存に失敗しました");
    }
  };

  return (
    <div className="px-auto mx-auto">
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
      {/* urlエリア */}
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor="url"
            className="block font-bold mb-1 mx-2 text-sm whitespace-nowrap"
          >
            URL
          </label>
          <textarea
            name="url"
            id="url"
            cols={30}
            rows={1}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="URLを入力してください"
          ></textarea>
        </div>
      </div>
      {/* 保存ボタン */}
      <div className="mt-2">
        <Button size={"small"} onClick={handleSave}>
          データを保存
        </Button>
      </div>
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
