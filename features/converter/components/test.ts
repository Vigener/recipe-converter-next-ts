/**
 * CSV形式の文字列をJSON配列に変換する関数
 * @param csv - 例: "強力粉, 260g\n薄力粉, 40g\n..."
 * @returns 例: [{ name: "強力粉", quantity: "260g" }, ...]
 */
export function csvToIngredients(
  csv: string
): { name: string; quantity: string }[] {
  return csv
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [name, quantity] = line.split(",").map((s) => s.trim());
      return { name, quantity };
    });
}

// 文字列で返したい場合
export function csvToIngredientsJson(csv: string): string {
  return JSON.stringify(csvToIngredients(csv));
}

// 使用例
const csvData = `
強力粉, 260g
薄力粉, 40g
砂糖, 30g
塩, 5g
卵(Lサイズ), 1個
牛乳, 200ml
無塩バター, 60g
ドライイースト, 5g
シナモンシュガー, 適量
レーズン, 適量
牛乳, 適量
粉糖, 40g
`;

console.log(csvToIngredients(csvData));
console.log(csvToIngredientsJson(csvData));
