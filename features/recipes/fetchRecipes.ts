// レシピAPIとの通信を行うユーティリティ

export async function fetchRecipes() {
  const res = await fetch("/api/recipes");
  if (!res.ok) throw new Error("レシピ一覧の取得に失敗しました");
  return res.json();
}

export async function saveRecipe(title: string, portion: string, csv: string) {
  const res = await fetch("/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, portion, csv }),
  });
  if (!res.ok) throw new Error("レシピの保存に失敗しました");
  return res.json();
}
