"use client";

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import FirstStep from "@/features/converter/components/firstStep";
import Integration from "@/features/converter/components/integration";
// import { Metadata } from "next";

function ConverterPage() {
  const [pastedData1, setPastedData1] = useState<string>("");
  const [pastedData2, setPastedData2] = useState<string>("");
  const [csv1, setCsv1] = useState<string>("");
  const [csv2, setCsv2] = useState<string>("");
  const [resize1, setResize1] = useState<number>(1);
  const [resize2, setResize2] = useState<number>(1);

  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>Recipe Converter</title>
        <meta
          name="description"
          content="Recipe Converter from recipe site data to csv data."
        />
      </Helmet>
      <h1 className="container text-2xl font-bold mb-2">
        レシピデータ整形ツール
      </h1>
      <label htmlFor="ingredients_data1" className="font-bold mb-2">
        レシピサイトからコピーした材料のデータを貼り付けて送信する
      </label>
      <div id="foreach-recipe" className="mb-4 md:flex">
        <FirstStep
          num={1}
          pastedData={pastedData1}
          setPastedData={setPastedData1}
          csv={csv1}
          setCsv={setCsv1}
          resize={resize1}
          setResize={setResize1}
        />
        <FirstStep
          num={2}
          pastedData={pastedData2}
          setPastedData={setPastedData2}
          csv={csv2}
          setCsv={setCsv2}
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
  );
}

export default ConverterPage;
