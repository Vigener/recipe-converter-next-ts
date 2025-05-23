"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvToIngredients = csvToIngredients;
exports.csvToIngredientsJson = csvToIngredientsJson;
/**
 * CSV形式の文字列をJSON配列に変換する関数
 * @param csv - 例: "強力粉, 260g\n薄力粉, 40g\n..."
 * @returns 例: [{ name: "強力粉", quantity: "260g" }, ...]
 */
function csvToIngredients(csv) {
    return csv
        .split("\n")
        .map(function (line) { return line.trim(); })
        .filter(function (line) { return line.length > 0; })
        .map(function (line) {
        var _a = line.split(",").map(function (s) { return s.trim(); }), name = _a[0], quantity = _a[1];
        return { name: name, quantity: quantity };
    });
}
// 文字列で返したい場合
function csvToIngredientsJson(csv) {
    return JSON.stringify(csvToIngredients(csv));
}
// 使用例
var csvData = "\n\u5F37\u529B\u7C89, 260g\n\u8584\u529B\u7C89, 40g\n\u7802\u7CD6, 30g\n\u5869, 5g\n\u5375(L\u30B5\u30A4\u30BA), 1\u500B\n\u725B\u4E73, 200ml\n\u7121\u5869\u30D0\u30BF\u30FC, 60g\n\u30C9\u30E9\u30A4\u30A4\u30FC\u30B9\u30C8, 5g\n\u30B7\u30CA\u30E2\u30F3\u30B7\u30E5\u30AC\u30FC, \u9069\u91CF\n\u30EC\u30FC\u30BA\u30F3, \u9069\u91CF\n\u725B\u4E73, \u9069\u91CF\n\u7C89\u7CD6, 40g\n";
console.log(csvToIngredients(csvData));
console.log(csvToIngredientsJson(csvData));
