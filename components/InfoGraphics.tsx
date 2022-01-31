import { Dispatch, SetStateAction } from "react";
import { Transaction } from "../types";
import DoughNut from "../components/Charts/DoughNut";
interface Props {
  modal: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  transactions: Transaction[];
}

const InfoGraphics = ({ modal, setModalOpen, transactions }: Props) => {
  const soc = [
    "Main",
    "Computer Society",
    "Communication Society",
    "SPS",
    "APS",
    "Sight",
    "WIE",
    "RAS",
  ];

  return (
    <>
      <div className="grid place-content-center m-4">
        <button
          onClick={() => setModalOpen(modal ? false : true)}
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer"
        >
          {modal ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 329.26933 329"
              width="20"
              height="15"
              fill="currentColor"
              className="mr-2"
              aria-hidden="true"
            >
              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              aria-hidden="true"
            ></svg>
          )}
          {modal ? "Close" : "Show Visuals"}
        </button>
      </div>
      {modal && (
        <div className="bg-gray-50 p-5 m-2">
          <DoughNut label={soc} transactions={transactions} />
        </div>
      )}
    </>
  );
};

export default InfoGraphics;
