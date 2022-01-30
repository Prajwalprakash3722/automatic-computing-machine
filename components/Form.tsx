import { Dispatch, SetStateAction, useState } from "react";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const Form = ({ transactions, setTransactions, setModal }: Props) => {
  const soc = [
    "main",
    "Computer Society",
    "Communication Society",
    "SPS",
    "APS",
    "Sight",
    "WIE",
    "RAS",
  ];

  const [data, setData] = useState<Transaction>({
    id: "asd",
    event: "",
    amount: 0,
    date: "",
    society: "",
    description: "",
    signedOff: "",
    type: "debit",
  });

  return (
    <>
      <div className="flex flex-col gap-4 m-2 md:w-1/3">
        <form
          onSubmit={() => {
            setTransactions([...transactions, data]), setModal(false);
          }}
        >
          <input
            className="focus:outline-none w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            id="event"
            placeholder="Event Name"
            onChange={(e) => setData({ ...data, event: e.target.value })}
            required
          />
          <input
            className="focus:outline-none w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="date"
            onChange={(e) => setData({ ...data, date: e.target.value })}
            placeholder="Event date"
            required
          />
          <input
            className="focus:outline-none w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="number"
            onChange={(e) =>
              setData({ ...data, amount: parseInt(e.target.value) })
            }
            placeholder="Event Amount"
            required
          />
          <div className="relative inline-block w-full text-gray-700">
            <select
              className="focus:outline-none w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              placeholder="Amount Type"
              onChange={(e) => setData({ ...data, type: e.target.value })}
              required
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <textarea
            placeholder="Description...."
            className="focus:outline-none w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            onChange={(e) => setData({ ...data, description: e.target.value })}
            required
          />
          <input
            className="focus:outline-none w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            onChange={(e) => setData({ ...data, signedOff: e.target.value })}
            placeholder="Signed Off By"
            required
          />
          <div className="relative inline-block w-full text-gray-700">
            <select
              className="focus:outline-none w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              placeholder="Society"
              onChange={(e) => setData({ ...data, society: e.target.value })}
              required
            >
              {soc.map((s, index) => (
                <option value={s} key={index}>
                  {s}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="p-2 m-2 hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
