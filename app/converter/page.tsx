"use client";

import React, { useState } from "react";
// import { Helmet } from "react-helmet";
import FirstStep from "@/features/converter/components/firstStep";
import Integration from "@/features/converter/components/integration";
import Button from "../components/elements/Button";
import RecipeHistory from "@/features/converter/components/RecipeHistory";
import HistoryHamburgerMenu from "@/features/converter/components/HistoryHamburgerMenu";
// import { Metadata } from "next";

function Modal(props: { show: boolean; setShow: (show: boolean) => void }) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.setShow(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);
  const closeModal = () => {
    props.setShow(false);
  };
  if (props.show) {
    return (
      <div
        id="overlay"
        onClick={closeModal}
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <div
          className="bg-white p-4 rounded-lg z-20 w-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <p>これがモーダルウィンドウです。</p>
          <p>
            <Button onClick={closeModal} className="border-black">
              閉じる
            </Button>
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

// recipe1,recipe2の型定義
export type RecipeState = {
  title: string;
  portion: string;
  csv: string;
};

function ConverterPage() {
  const [pastedData1, setPastedData1] = useState<string>("");
  const [pastedData2, setPastedData2] = useState<string>("");
  const [title1, setTitle1] = useState<string>("");
  const [title2, setTitle2] = useState<string>("");

  const [csv1, setCsv1] = useState<string>("");
  const [csv2, setCsv2] = useState<string>("");
  const [resize1, setResize1] = useState<number>(1);
  const [resize2, setResize2] = useState<number>(1);

  // 改善案
  const [recipe1, setRecipe1] = useState<RecipeState>({
    title: "",
    portion: "",
    csv: "",
  });
  const [recipe2, setRecipe2] = useState<RecipeState>({
    title: "",
    portion: "",
    csv: "",
  });

  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="container mx-auto px-4">
      {/* <Button onClick={() => setShow(true)} className="border-black">モーダルを開く</Button> */}
      <h1 className="container text-2xl font-bold pt-8 pb-4">
        レシピデータ整形ツール
      </h1>
      <h2 className="mb-12">
        レシピサイトからコピーした材料のデータを貼り付けて送信する
      </h2>
      <div className="md:flex">
        <RecipeHistory
          setRecipe1={setRecipe1}
          setRecipe2={setRecipe2}
          // setCsv1={setCsv1}
          // setTitle2={setTitle2}
          // setCsv2={setCsv2}
        />
        <div className="md:w-3/4 lg:w-full">
          <div id="foreach-recipe" className="mb-4 md:flex">
            <FirstStep
              num={1}
              pastedData={pastedData1}
              setPastedData={setPastedData1}
              portion={recipe1.portion}
              setPortion={(portion: string) =>
                setRecipe1({ ...recipe1, portion })
              }
              title={recipe1.title}
              setTitle={(title: string) => setRecipe1({ ...recipe1, title })}
              // csv={csv1}
              // setCsv={setCsv1}
              csv={recipe1.csv}
              setCsv={(csv: string) => setRecipe1({ ...recipe1, csv })}
              resize={resize1}
              setResize={setResize1}
            />
            <FirstStep
              num={2}
              pastedData={pastedData2}
              setPastedData={setPastedData2}
              portion={recipe2.portion}
              setPortion={(portion: string) =>
                setRecipe2({ ...recipe2, portion })
              }
              title={recipe2.title}
              setTitle={(title: string) => setRecipe2({ ...recipe2, title })}
              csv={recipe2.csv}
              setCsv={(csv: string) => setRecipe2({ ...recipe2, csv })}
              resize={resize2}
              setResize={setResize2}
            />
          </div>
          <br />
          <div id="integration" className="mb-4 bg-center">
            <Integration
              csv1={csv1}
              csv2={csv2}
              resize1={resize1}
              resize2={resize2}
            />
          </div>
        </div>
      </div>
      {/* <Modal show={show} setShow={setShow}/> */}
    </div>
  );
}

export default ConverterPage;
