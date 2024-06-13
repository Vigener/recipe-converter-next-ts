import React from "react";
import { Header } from "../components/layouts/Header/Header";

function accountantPage() {
  return (
    <>
      {/* <Header /> */}
      <h1 className="text-2xl font-bold">Accountant Page</h1>
      <a
        href="https://docs.google.com/spreadsheets/d/1cUufC571IXfF00JShMXHd_8L6qGu7OmnNLIu2Iz1Os0/edit?pli=1#gid=1370979083"
        className="text-blue-500 underline hover:text-blue-800"
      >
        スプレッドシートはこちらから
      </a>

      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT_ORlk1shK7Rh21MZ-qkH7FE4zAzquO8Vwn1OKSqp1qj8MtF5e1Bn40fqHzjNKq8aOFmD6jKUdx_yr/pubhtml?gid=1370979083&amp;single=true&amp;widget=true&amp;headers=false"
        width="100%"
        height="800"
      ></iframe>
    </>
  );
}

export default accountantPage;
