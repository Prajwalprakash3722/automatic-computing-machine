import { Dispatch, SetStateAction } from "react";
import { Transaction } from "../types";
import Form from "./Form";

interface Props {
  modal: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
  sid?: number | null;
}

const AddModal = ({
  modal,
  transactions,
  sid,
  setModalOpen,
  setTransactions,
}: Props) => {
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
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
          )}
          {modal ? "Close" : "New Transaction"}
        </button>
      </div>
      {modal && (
        <div className="flex flex-row items-center justify-center w-full bg-slate-200 p-4 transition ease-in-out delay-150 duration-100	">
          <Form
            transactions={transactions}
            setTransactions={setTransactions}
            setModal={setModalOpen}
            sid={sid}
          />
        </div>
      )}
    </>
  );
};

export default AddModal;
