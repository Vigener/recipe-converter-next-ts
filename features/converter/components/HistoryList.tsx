import Button from "@/app/components/elements/Button";
import { RecipeState } from "@/app/converter/page";
import React from "react";

type ingredient = {
  name: string;
  quantity: string;
};

// recipeHistoryのデータ型を定義
type Recipe_FROM_DB = {
  id: number;
  title: string;
  quantity: string;
  ingredients: ingredient[];
  lastCookedAt: string;
  createdAt: string;
  url: string;
};

interface HistoryListProps {
  setRecipe1: React.Dispatch<React.SetStateAction<RecipeState>>;
  setRecipe2: React.Dispatch<React.SetStateAction<RecipeState>>;
}

// レシピデータのサンプル 後々はローカルストレージやデータベースに保存したい
const recipeHistory: Recipe_FROM_DB[] = [
  {
    id: 1,
    title: "カレーパン",
    quantity: "4人分",
    ingredients: [
      { name: "強力粉", quantity: "150g" },
      { name: "ドライイースト", quantity: "3g" },
      { name: "砂糖", quantity: "15g" },
      { name: "塩", quantity: "3g" },
      { name: "オリーブオイル", quantity: "15g" },
      { name: "カレー(レトルトでも手作りでも)", quantity: "200g程度" },
      { name: "パン粉", quantity: "適量" },
      { name: "卵", quantity: "1個" },
    ],
    lastCookedAt: "2021-10-10",
    createdAt: "2021-10-10",
    url: "https://cookpad.com/recipe/1234567",
  },
  {
    id: 2,
    title: "シナモンロール",
    quantity: "8~9個",
    ingredients: [
      { name: "強力粉", quantity: "260g" },
      { name: "薄力粉", quantity: "40g" },
      { name: "砂糖", quantity: "30g" },
      { name: "塩", quantity: "5g" },
      { name: "卵(Lサイズ)", quantity: "1個" },
      { name: "牛乳", quantity: "200ml" },
      { name: "無塩バター", quantity: "60g" },
      { name: "ドライイースト", quantity: "5g" },
      { name: "シナモンシュガー", quantity: "適量" },
      { name: "レーズン", quantity: "適量" },
      { name: "牛乳", quantity: "適量" },
      { name: "粉糖", quantity: "40g" },
      { name: "水", quantity: "小さじ2" },
    ],
    lastCookedAt: "2021-10-11",
    createdAt: "2021-10-11",
    url: "https://cookpad.com/recipe/2345678",
  },
];

function convertCsvToObj(csv: string) {
  // データを改行で分割して各行を取得
  const lines = csv.split("\n");

  // 各行をオブジェクトに変換
  const ingredients = lines.map((line) => {
    const [name, quantity] = line.split(", ");
    return { name, quantity };
  });

  // 結果を返す
  return { ingredients };
}

function convertObjToCsv(obj: ingredient[]) {
  // 各オブジェクトを文字列に変換
  const lines = obj.map((ingredient) => {
    return `${ingredient.name}, ${ingredient.quantity}`;
  });

  // 文字列を改行で結合
  const data = lines.join("\n");

  // 結果を返す
  return data;
}

// 文字列を数字部分とそれ以外に分ける関数
function splitString(str: string) {
  const numberPartMatch = str.match(/(\d+~?\d*)|(\d+)/g);
  const numberPart = numberPartMatch ? numberPartMatch.join("~") : ""; // 数字部分（範囲も考慮）
  const nonNumberPart = str.replace(numberPart, "").split("~"); // 数字部分を除去して分割

  return { numberPart, nonNumberPart };
}

// 数字部分のみを引数倍して返す関数
function multiplyNumberPart(str: string, multiplier: number) {
  const { numberPart, nonNumberPart } = splitString(str);

  // 範囲の場合（例："8~9"）、最小値と最大値を取得
  const [min, max] = numberPart.split("~").map(Number);

  // 範囲の場合、最小値と最大値それぞれを倍にする
  // 範囲でない場合、その数値を倍にする
  const multipliedNumberPart = max
    ? `${min * multiplier}~${max * multiplier}`
    : `${min * multiplier}`;

  return `${nonNumberPart[0]}${multipliedNumberPart}${nonNumberPart[1]}`;
}

function updateRecipeHistory(
  recipeHistory: Recipe_FROM_DB[],
  newRecipe: Recipe_FROM_DB
) {
  // lastCookedAtの値を'yyyy-mm-dd'の形式に修正
  // newRecipe.lastCookedAt = newRecipe.lastCookedAt.split("T")[0];

  // 新しいレシピを追加
  recipeHistory.push(newRecipe);

  // lastCookedAtの日付部分のみを使用して降順でソート
  recipeHistory.sort((a, b) => {
    const dateA = new Date(a.lastCookedAt).getTime();
    const dateB = new Date(b.lastCookedAt).getTime();
    return dateB - dateA;
  });

  return recipeHistory;
}

interface RecipeItemProps extends HistoryListProps {
  recipe: Recipe_FROM_DB;
}

// レシピデータを表示するコンポーネント
const RecipeItem: React.FC<RecipeItemProps> = (props) => {
  return (
    <div className="mb-4 border border-gray-300">
      <h3 className="text-lg font-bold">
        {/* <a href={recipe.url} className="text-blue-500 hover:underline"> */}
        {props.recipe.title}
        {/* </a> */}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        {/* 作成日: {recipe.createdAt} */}
        {props.recipe.lastCookedAt
          ? ` 最終調理日: ${props.recipe.lastCookedAt}`
          : ""}
      </p>
      {/* <p className="text-sm text-gray-600 mb-2">材料:</p>
      <ul className="list-disc pl-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-sm text-gray-600">
            {ingredient.name}: {ingredient.quantity}
          </li>
        ))}
      </ul> */}
      <Button
        size="small"
        color="secondary"
        className="mb-1"
        onClick={() => InsertIntoRecipe(props.recipe, props.setRecipe1)}
      >
        レシピ1として選択
      </Button>
      <Button
        size="small"
        color="secondary"
        className="mb-1"
        onClick={() => InsertIntoRecipe(props.recipe, props.setRecipe2)}
      >
        レシピ2として選択
      </Button>
    </div>
  );
};

// csv1にセットするボタンのonclick時の関数を定義
const InsertIntoRecipe = (
  recipe: Recipe_FROM_DB,
  setRecipe1: React.Dispatch<React.SetStateAction<RecipeState>>
) => {
  const csv = convertObjToCsv(recipe.ingredients);
  setRecipe1({
    title: recipe.title,
    portion: recipe.quantity,
    csv: csv,
  });
};

// function setRecipe1(recipe: Recipe_FROM_DB, setCsv1: any) {
//   const csv = convertObjToCsv(recipe.ingredients);

//   setCsv1(csv);
//   // modalを閉じる
//   // onClickClose();
// }

// csv2にセットするボタンのonclick時の関数を定義
// function setRecipe2(recipe: Recipe_FROM_DB, setCsv2: any) {
//   const csv = convertObjToCsv(recipe.ingredients);
//   setCsv2(csv);
// }

const HistoryList: React.FC<HistoryListProps> = (props) => {
  return (
    <div className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
      <h2 className="block text-gray-700 text-sm font-bold mb-2">
        レシピの履歴
      </h2>
      <input
        type="text"
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      {/* ここに履歴データを表示するコードを追加します */}
      {recipeHistory.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} {...props} />
      ))}
    </div>
  );
};

export default HistoryList;
