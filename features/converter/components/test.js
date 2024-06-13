// function updateRecipeHistory(recipeHistory, newRecipe) {
//   // lastCookedAtの値を'yyyy-mm-dd'の形式に修正
//   newRecipe.lastCookedAt = newRecipe.lastCookedAt.split("T")[0];

//   // 新しいレシピを追加
//   recipeHistory.push(newRecipe);

//   // lastCookedAtの日付部分のみを使用して降順でソート
//   recipeHistory.sort((a, b) => {
//     const dateA = new Date(a.lastCookedAt);
//     const dateB = new Date(b.lastCookedAt);
//     return dateB - dateA;
//   });

//   return recipeHistory;
// }

function updateRecipeHistory(recipeHistory, newRecipe) {
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

// テスト
let recipeHistory = [
  { id: 1, name: "レシピ1", lastCookedAt: "2022-01-01" },
  { id: 2, name: "レシピ2", lastCookedAt: "2022-01-02" },
  { id: 3, name: "レシピ3", lastCookedAt: "2022-01-03" },
];

const newRecipe = {
  id: 4,
  name: "レシピ4",
  lastCookedAt: new Date().toISOString(),
};

newRecipe.lastCookedAt = newRecipe.lastCookedAt.split("T")[0];

recipeHistory = updateRecipeHistory(recipeHistory, newRecipe);

console.log(recipeHistory);
