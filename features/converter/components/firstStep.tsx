import { useState, useEffect } from "react";
import Resizing from "./resizing";
import { fetchGemini } from "@/features/Gemini/fetchGemini";

interface firstStepProps {
  num: number;
  csv: string;
  setCsv: any;
  pastedData: string;
  setPastedData: any;
  resize: number;
  setResize: any;
  portion: string;
  setPortion: any;
  title: string;
  setTitle: any;
}

function FirstStep(props: firstStepProps): JSX.Element {
  // const [title, setTitle] = useState("");
  // const [portion, setPortion] = useState("");
  // const [ingredients, setIngredients] = useState("");
  async function handleClick() {
    // const data = document.getElementById(`ingredients_data${num}`).value;
    // if (!data || !/\d/.test(data)) {
    // console.log(pastedData);
    if (!props.pastedData) {
      alert("データを貼り付けてください");
      const textarea = document.getElementById(`ingredients_data${props.num}`);
      if (textarea) {
        textarea.focus();
      }
      return;
    }
    // props.setTitle("");
    // props.setPortion("");
    props.setCsv("Loading...");
    const systemInstruction =
      "# 依頼\n {# データ}から{# 制約条件}を元に結果を出力して下さい。\nただし、{# 制約条件}を守ること。\n# 制約条件\n- 一行目には、{# データ}からレシピ名を抜き出し、一般的な名称で出力して下さい。\n - 二行目には、材料が何個分や何枚分、何人前などなどの完成品の数量を{# データ}から抜き出して出力して下さい。\n一行目と二行目に関してはCSV形式や表の形式にする必要は有りません。\n- 三行目は'Ingredient, Quantity'としてください。\n- 四行目以降は{# データ}から抜き出した材料とその量を日本語でCSVの形式に出力して下さい。\n- また、このデータは材料名と量が交互に書かれていますが、途中で材料と関係のない単語が含まれている場合があります。必要のないと思われる単語は適切に削除しながら出力してください。\n- ドライイーストとインスタントドライイーストは同じものであるため、ドライイーストという名前で一つの項目にして下さい。\n- 同じ名称の項目が複数存在する場合は、それは量を合計して一つの項目にしてください。\n- 溶き卵等、卵は同じ名称の項目です。存在しない場合は卵というIngredientの行を作らないで下さい。\n- ”水”、”お湯”は材料から削除して項目に入れないでください。\n- 単位はつけたままにすること\n\n# データ\n";
    const prompt = systemInstruction + props.pastedData;
    const response = await fetchGemini(prompt);
    // useEffect(() => {
    //   const lines = response.split("\n");
    //   props.setTitle(lines[0]);
    //   props.setPortion(lines[1]);
    //   const ingredients = lines.slice(4).join("\n");
    //   // setIngredients(ingredients);
    //   props.setCsv(ingredients);
    // }),
    //   [];
    console.log(response);
    const lines = response.split("\n");
    console.log(lines[0]);
    console.log(lines[1]);
    const ingredients = lines.slice(4).join("\n");
    props.setTitle(lines[0]);
    props.setPortion(lines[1]);
    props.setCsv(ingredients);
    // setCsv(response);
  }

  // const RecipeComponent = (data: string) => {
  //   const [title, setTitle] = useState("");
  //   const [portion, setPortion] = useState("");
  //   const [ingredients, setIngredients] = useState("");

  //   useEffect(() => {
  //     const lines = data.split("\n");
  //     setTitle(lines[0]);
  //     setPortion(lines[1]);
  //     const ingredients = lines.slice(4).join("\n");
  //     setIngredients(ingredients);
  //   }, []);

  //   return (
  //     <div>
  //       <div className="flex">
  //         <div className="basis-1/2">
  //           <textarea
  //             name="title"
  //             id="title"
  //             value={title}
  //             onChange={(e) => setTitle(e.target.value)}
  //             className="border border-gray-300 rounded p-2 mb-0 h-28 px-2"
  //           ></textarea>
  //         </div>
  //         <div className="basis-1/2">
  //           <textarea
  //             name="portion"
  //             id="portion"
  //             value={portion}
  //             onChange={(e) => setPortion(e.target.value)}
  //             className="border border-gray-300 rounded p-2 mb-0 h-28 px-2"
  //           />
  //         </div>
  //         <textarea
  //           name="csvデータ"
  //           id="csv1"
  //           cols={30}
  //           rows={10}
  //           value={csv}
  //           onChange={(e) => setCsv(e.target.value)}
  //           className="border border-gray-300 rounded p-2"
  //         />
  //         <div className="mt-1 mb-1 flex items-center justify-center">
  //           <span className="mt-">全体量を</span>
  //           <input
  //             type="number"
  //             id="resize"
  //             value={resize}
  //             onChange={(e) => setResize(e.target.value)}
  //             step="0.5"
  //             className="[appearance:textfield] [&::-webkit-outer-spin-button] [&::-webkit-inner-spin-button] border border-gray-300 rounded p-2 w-10 ml-2"
  //           />
  //           <span className="ml-2">倍にする</span>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

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
