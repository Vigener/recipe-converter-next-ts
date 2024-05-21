// "use client";

// import React, { useState, useEffect, useRef } from "react";

// // ヒント可能な要素のインターフェース
// interface HintElement {
//   element: HTMLElement;
//   rect: DOMRect;
//   hintString: string;
// }

// // キーボードイベントを処理するフック
// const useKeyboardEvents = (): {
//   activeHint: HintElement | null;
//   hints: HintElement[];
//   showHints: boolean;
//   hintContainerRef: React.MutableRefObject<HTMLDivElement | null>;
// } => {
//   const [keyPressed, setKeyPressed] = useState(false);
//   const [keyPressedQueue, setKeyPressedQueue] = useState<string[]>([]);
//   const [activeHint, setActiveHint] = useState<HintElement | null>(null);
//   const [hints, setHints] = useState<HintElement[]>([]);
//   const [showHints, setShowHints] = useState(false);

//   const hintContainerRef = useRef<HTMLDivElement | null>(null);

//   // キーボードイベントリスナーの設定
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (
//         document.activeElement &&
//         document.activeElement.tagName === "INPUT"
//       ) {
//         // input要素にフォーカスしている場合は処理しない
//         return;
//       }

//       if (event.key === "f" && !keyPressed) {
//         setKeyPressed(true);
//         setShowHints(true);
//         findHints(); // ヒントの検索
//       } else if (keyPressed) {
//         // ヒントのキー入力処理
//         setKeyPressedQueue((prevQueue) => [...prevQueue, event.key]);
//         setActiveHint(
//           hints.find((hint) =>
//             hint.hintString.startsWith(keyPressedQueue.join(""))
//           )
//         );
//       }
//     };

//     const handleKeyUp = (event: KeyboardEvent) => {
//       if (event.key === "f") {
//         setKeyPressed(false);
//         setShowHints(false);
//         setKeyPressedQueue([]);
//         setActiveHint(null);
//       }
//     };

//     // イベントリスナーの登録
//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     // イベントリスナーの解除
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, [keyPressed, keyPressedQueue, activeHint, hints]);

//   // ヒントの検索
//   const findHints = () => {
//     const clickableElements = document.querySelectorAll(
//       "input, textarea, button"
//     );
//     const hints: HintElement[] = [];

//     clickableElements.forEach((element) => {
//       const rect = element.getBoundingClientRect();
//       hints.push({
//         element: element,
//         rect: rect,
//         hintString: String.fromCharCode(hints.length + 97), // aから始まるヒント文字
//       });
//     });

//     setHints(hints);
//   };

//   return {
//     activeHint,
//     hints,
//     showHints,
//     hintContainerRef,
//   };
// };

// const Hint: React.FC<{
//   hint: HintElement;
// }> = ({ hint }) => {
//   return (
//     <div
//       className="absolute text-white bg-blue-500 rounded"
//       style={{ left: `${hint.rect.left}px`, top: `${hint.rect.top}px` }}
//       onClick={() => hint.element.focus()}
//     >
//       {hint.hintString}
//     </div>
//   );
// };

// // ヒント表示コンポーネント
// const HintDisplay: React.FC<{
//   activeHint: HintElement | null;
//   hints: HintElement[];
//   showHints: boolean;
//   hintContainerRef: React.MutableRefObject<HTMLDivElement | null>;
// }> = ({ activeHint, hints, showHints, hintContainerRef }) => {
//   useEffect(() => {
//     // hintsが更新されたときにヒントの表示を更新する
//     if (showHints) {
//       const hintContainer = hintContainerRef.current;
//       if (hintContainer) {
//         hintContainer.innerHTML = "";
//         hints.forEach((hint) => {
//           const hintElement = document.createElement("div");
//           hintElement.style.position = "absolute";
//           hintElement.style.left = `${hint.rect.left}px`;
//           hintElement.style.top = `${hint.rect.top}px`;
//           hintElement.textContent = hint.hintString;
//           hintElement.addEventListener("click", () => {
//             hint.element.focus(); // 要素にフォーカス
//           });

//           hintContainer.appendChild(hintElement);
//         });
//       }
//     }
//   }, [hints, showHints]);

//   return (
//     <div
//       ref={hintContainerRef}
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         zIndex: 1000,
//         pointerEvents: "none",
//       }}
//     >
//       {/* ヒント表示領域 */}
//     </div>
//   );
// };

// const handleClick = () => {
//   alert("Hello, World!");
// };

// // メインコンポーネント
// const App: React.FC = () => {
//   const { activeHint, hints, showHints, hintContainerRef } =
//     useKeyboardEvents();
//   const [input, setInput] = useState("");
//   const [text, setText] = useState("");

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow">
//         <input
//           type="text"
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           value={input}
//           onChange={(event) => setInput(event.target.value)}
//         />
//         <textarea
//           value={text}
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           onChange={(event) => setText(event.target.value)}
//         ></textarea>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleClick}
//         >
//           Click me
//         </button>
//       </div>
//       {/* <HintDisplay
//         activeHint={activeHint}
//         hints={hints}
//         showHints={showHints}
//         hintContainerRef={hintContainerRef}
//       /> */}
//     </div>
//   );
// };

// export default App;
