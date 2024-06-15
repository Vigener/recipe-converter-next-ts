import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { fetchGemini } from "@/features/Gemini/fetchGemini";

function Integration({
  csv1,
  csv2,
  resize1,
  resize2,
}: {
  csv1: string;
  csv2: string;
  resize1: number;
  resize2: number;
}) {
  const [resultText, setResultText] = useState("");
  async function handleClick() {
    if (!csv1 && !csv2) {
      alert("データを貼り付けてください");
      return;
    } else if (!csv2) {
      if (resize1 !== 1) {
        // const systemInstruction1 = `全体量を${resize1}倍にしてください。`;
        // const prompt1 = systemInstruction1 + "\n\n" + csv1;
        // fetchGemini(prompt1).then((result1) => {
        //   setResultText(result1);
        // });
        setResultText("Loading...");
        const result: string = await resizeFetch(csv1, resize1);
        setResultText(result);
      } else {
        setResultText(csv1);
      }
    } else if (!csv1) {
      if (resize2 !== 1) {
        setResultText("Loading...");
        const systemInstruction2 = `全体量を${resize2}倍にしてください。`;
        const prompt2 = systemInstruction2 + "\n\n" + csv2;
        fetchGemini(prompt2).then((result2) => {
          setResultText(result2);
        });
      } else {
        setResultText(csv2);
      }
    } else {
      setResultText("Loading...");
      const preResult1: string = await resizeFetch(csv1, resize1);
      const preResult2: string = await resizeFetch(csv2, resize2);
      const combinedResult: string = await integrateFetch(
        preResult1,
        preResult2
      );
      setResultText(combinedResult);
    }

    async function resizeFetch(csv: string, resize: number): Promise<string> {
      if (resize > 0.8 && resize <= 1.1) {
        // 原因はここだったというか、resizeが整数と浮動小数点数の定義が曖昧だったせいで、===になっていなかった。
        // とりあえず、0.8 < resize <= 1という条件でresizeが1の場合にも対応できるようにした。
        return csv;
      } else {
        const systemInstruction = `全体量を${resize}倍にしてください。`;
        const prompt = systemInstruction + "\n\n" + csv;
        const result = await fetchGemini(prompt);
        return result as string;
      }
    }

    async function integrateFetch(result1: string, result2: string) {
      const combinedData = result1 + "\n\n" + result2;
      const systemInstruction3 =
        "2つのデータをもとに、一つのcsvにまとめてください。\n一行目はIngredient, Quantityというヘッダー情報とし、同様の材料はまとめて、一つの行にし、quantityは足し算をして表示してください。\n※ドライイーストとインスタントドライイーストは同じものなのでドライイーストという名前で一つのものとして考えてください。";
      const prompt3 = systemInstruction3 + "\n\n" + combinedData;
      const result = await fetchGemini(prompt3);
      return result as string;
      // fetchGemini(prompt3).then((result3) => {
      //   return result3 ;
      // });
    }

    // const systemInstruction1 = `全体量を${resize1}倍にしてください。`;
    // const prompt1 = systemInstruction1 + "\n\n" + csv1;
    // fetchGemini(prompt1).then((result1) => {
    //   // console.log(result1);
    //   const systemInstruction2 = `全体量を${resize2}倍にしてください。`;
    //   const prompt2 = systemInstruction2 + "\n\n" + csv2;
    //   fetchGemini(prompt2).then((result2) => {
    //     // console.log(result2);
    //     const combinedData = result1 + "\n\n" + result2;
    //     const systemInstruction3 =
    //       "2つのデータをもとに、一つのcsvにまとめてください。\n一行目はIngredient, Quantityというヘッダー情報とし、同様の材料はまとめて、一つの行にし、quantityは足し算をして表示してください。\n※ドライイーストとインスタントドライイーストは同じものなのでドライイーストという名前で一つのものとして考えてください。";
    //     const prompt3 = systemInstruction3 + "\n\n" + combinedData;
    //     fetchGemini(prompt3).then((result3) => {
    //       // document.getElementById("integration-area").value = result3;
    //       setResultText(result3);
    //     });
    //   });
    // });
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(resultText);
    alert("コピーしました");
  };

  return (
    <div className="basis-1/2">
      <h2 className="block font-bold mb-2">レシピデータを統合する</h2>
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="block px-4 py-2 mt-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          統合
        </button>
      </div>

      <div className="bg-center">
        <label className="block">統合結果</label>
        <textarea
          name="レシピ統合"
          id="integration-area"
          cols={30}
          rows={10}
          value={resultText}
          onChange={(e) => setResultText(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-0 px-2"
        ></textarea>
        <div>
          <label>
            結果をコピー
            <Tooltip title="結果をコピー" placement="top" arrow>
              <IconButton
                color="primary"
                size="medium"
                onClick={copyToClipboard}
              >
                <ContentCopyIcon fontSize="medium"></ContentCopyIcon>
              </IconButton>
            </Tooltip>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Integration;
