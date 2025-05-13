import { useState, useEffect } from "react";
import Resizing from "./resizing";
import { fetchGemini } from "@/features/Gemini/fetchGemini";

interface firstStepProps {
  num: number;
  csv: string;
  setCsv: (csv: string) => void;
  pastedData: string;
  setPastedData: (data: string) => void;
  resize: number;
  setResize: (resize: number) => void;
  portion: string;
  setPortion: (portion: string) => void;
  title: string;
  setTitle: (title: string) => void;
}

function FirstStep(props: firstStepProps): JSX.Element {
  async function handleClick() {
    if (!props.pastedData) {
      alert("データを貼り付けてください");
      const textarea = document.getElementById(`ingredients_data${props.num}`);
      if (textarea) {
        textarea.focus();
      }
      return;
    }
    props.setCsv("Loading...");
    const systemInstruction =
      "# 依頼\n {# データ}から{# 制約条件}を元に結果を出力して下さい。\nただし、{# 制約条件}を守ること。\n# 制約条件\n- 一行目には、{# データ}からレシピ名を抜き出し、一般的な名称で出力して下さい。\n - 二行目には、材料が何個分や何枚分、何人前などなどの完成品の数量を{# データ}から抜き出して出力して下さい。\n一行目と二行目に関してはCSV形式や表の形式にする必要は有りません。\n- 三行目は'Ingredient, Quantity'としてください。\n- 四行目以降は{# データ}から抜き出した材料とその量を日本語でCSVの形式に出力して下さい。\n- また、このデータは材料名と量が交互に書かれていますが、途中で材料と関係のない単語が含まれている場合があります。必要のないと思われる単語は適切に削除しながら出力してください。\n- ドライイーストとインスタントドライイーストは同じものであるため、ドライイーストという名前で一つの項目にして下さい。\n- 同じ名称の項目が複数存在する場合は、それは量を合計して一つの項目にしてください。\n- 溶き卵等、卵は同じ名称の項目です。存在しない場合は卵というIngredientの行を作らないで下さい。\n- ”水”、”お湯”は材料から削除して項目に入れないでください。\n- 単位はつけたままにすること\n\n# データ\n";
    const prompt = systemInstruction + props.pastedData;
    const response = await fetchGemini(prompt);
    console.log(response);
    const lines = response
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string | any[]) => line.length > 0);
    console.log(lines[0]);
    console.log(lines[1]);
    const ingredients = lines.slice(3).join("\n");
    props.setTitle(lines[0]);
    props.setPortion(lines[1]);
    props.setCsv(ingredients);
  }

  return (
    <div className="basis-2/3">
      <label
        htmlFor={`ingredients_data${props.num}`}
        className="block font-bold mb-2"
      >
        {props.num}つ目のデータ
      </label>
      <textarea
        name="データを貼り付けて下さい"
        placeholder="データを貼り付けて下さい"
        id={`ingredients_data${props.num}`}
        value={props.pastedData}
        onChange={(e) => props.setPastedData(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-0 h-28 px-2 w-full"
      ></textarea>
      <br />
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        送信
      </button>
      <div className="text-center mt-1 mb-1">
        <span className="text-2xl">↓</span>
      </div>
      <Resizing
        title={props.title}
        setTitle={props.setTitle}
        portion={props.portion}
        setPortion={props.setPortion}
        csv={props.csv}
        setCsv={props.setCsv}
        resize={props.resize}
        setResize={props.setResize}
      />
    </div>
  );
}

export default FirstStep;
