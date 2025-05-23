// レシピAPIとの通信を行うユーティリティ

export async function fetchRecipes() {
  const res = await fetch("/api/recipes");
  if (!res.ok) throw new Error("レシピ一覧の取得に失敗しました");
  return res.json();
}

export async function saveRecipe(
  title: string,
  quantity: string,
  ingredients: any,
  url: string
) {
  const res = await fetch("/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, quantity, ingredients, url }),
  });
  if (!res.ok) throw new Error("レシピの保存に失敗しました");
  return res.json();
}
