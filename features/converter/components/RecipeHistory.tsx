import React from "react";
import HistoryList from "./HistoryList";
import { RecipeState } from "@/app/converter/page";

interface RecipeHistoryProps {
  // setCsv1: React.Dispatch<React.SetStateAction<string>>;
  // setCsv2: React.Dispatch<React.SetStateAction<string>>;
  setRecipe1: React.Dispatch<React.SetStateAction<RecipeState>>;
  setRecipe2: React.Dispatch<React.SetStateAction<RecipeState>>;
}

// const RecipeHistory = (
//   // csv1: string,
//   setCsv1: any,
//   // csv2: string,
//   setCsv2: any
// ) => {
const RecipeHistory: React.FC<RecipeHistoryProps> = (props) => {
  const [open, setOpen] = React.useState(false);

  const onClickOpen = () => setOpen(true);
  const onClickClose = () => setOpen(false);

  return (
    <div className="md:w-1/4">
      {/* PCの場合のみ表示する要素 */}
      <div className="hidden lg:block">
        <HistoryList
          // csv1={csv1}
          setRecipe1={props.setRecipe1}
          // csv2={csv2}
          setRecipe2={props.setRecipe2}
        />
      </div>

      {/* タブレット・スマホの場合のみ表示する要素 */}
      <div className="lg:hidden">
        {!open && (
          <svg
            onClick={onClickOpen}
            xmlns="http://www.w3.org/2000/svg"
            className="w-5"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            role="img"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        )}
        {/* {open && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div
              className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
              onClick={onClickClose}
            ></div>
            <div className="bg-white w-1/4 h-full overflow-auto">
              <svg
                onClick={onClickClose}
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
              <HistoryList />
            </div>
          </div>
        )} */}
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-start items-center z-50">
            <div
              className="bg-white max-w-60 h-full overflow-auto relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                onClick={onClickClose}
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 absolute top-0 right-0 m-2 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
              <HistoryList
                // csv1={csv1}
                setRecipe1={props.setRecipe1}
                // csv2={csv2}
                setRecipe2={props.setRecipe2}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeHistory;
