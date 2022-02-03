/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, {
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import { Transaction } from "../types";
import toast, { Toaster } from "react-hot-toast";
import { parseSociety } from "../Misc/parseSociety";
import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Props {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  sid?: number | null;
}

const Form = ({ transactions, setTransactions, setModal, sid }: Props) => {
  const soc = [
    "Main",
    "Computer Society",
    "Communication Society",
    "SPS",
    "APS",
    "RAS",
    "PES",
    "Sight",
    "WIE",
  ];

  const [data, setData] = useState<Transaction>({
    event: "",
    date: "",
    amount: 0,
    type: "debit",
    description: "",
    signedOff: "",
    society: "",
  });

  React.useEffect(() => {
    setData(
      sid
        ? {
            ...data,
            society: parseSociety(sid as number) as string,
          }
        : data
    );
  }, [sid]);

  const [url, setUrl] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState<File | null>(
    new File([], "", { type: "application/pdf" })
  );
  const createUpload = async () => {
    const imageRef = await ref(
      storage,
      `${parseSociety(sid as number)}/${data.event}/${file!.name}`
    );
    await uploadBytes(imageRef, file!)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            setUploaded(true);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setFile(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUpload = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      toast.promise(
        createUpload(),
        {
          loading: "Working on it...",
          success: "File Uploaded successfully!",
          error: "Oops! something went wrong.",
        },
        {
          duration: 3000,
        }
      );
    } catch (error) {
      toast.error(error as any);
    }
  };

  /**
   *
   * @param data
   * @description handles the api request and toaster notifications
   */
  const create = async (data: Transaction) => {
    try {
      await axios.post("http://localhost:3000/api/transaction/add", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") as string,
        },
      });
      setModal(false);
      setTransactions([...transactions, data]);
    } catch (error) {
      throw new Error(error as any);
    }
  };

  /**
   *
   * @param e
   * @param data
   * @description handles the form submission
   */
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    data: Transaction
  ) => {
    e.preventDefault();
    try {
      toast.promise(
        create(data),
        {
          loading: "Working on it...",
          success: "Transaction Added successfully!",
          error: "Oops! something went wrong.",
        },
        {
          duration: 3000,
        }
      );
    } catch (error) {
      toast.error(error as any);
    }
  };

  return (
    <>
      <Toaster reverseOrder={false} />
      <div className="flex flex-col gap-4 m-2 md:w-1/3">
        <form
          onSubmit={(e) => {
            handleSubmit(e, data);
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
            type="float"
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
          {!sid ? (
            <div className="relative inline-block w-full text-gray-700">
              <select
                className="focus:outline-none w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                placeholder="Society"
                onChange={(e) => {
                  sid
                    ? setData({ ...data, society: e.target.value })
                    : setData({
                        ...data,
                        society: parseSociety(sid as number) as string,
                      });
                }}
                value={parseSociety(sid as number)}
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
          ) : (
            <>
              <div className="relative inline-block w-full text-gray-700">
                <p className="text-center w-full h-10 p-2 text-base bg-gray-400 border rounded-lg appearance-none focus:shadow-outline">
                  {parseSociety(sid as number)}
                </p>
              </div>
            </>
          )}
          <label htmlFor="file" className="font-bold p-4">
            Upload your reports here
          </label>
          <div className="flex flex-row">
            <input
              className="focus:outline-none w-full h-12 px-4 m-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="file"
              onChange={(e) => {
                setFile(e.target.files![0] as File);
              }}
              placeholder="Event Amount"
              required
            />
            <button
              onClick={(e) => {
                handleUpload(e);
              }}
              className="p-2 m-2 hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer"
            >
              Upload Files
            </button>
          </div>
          <button
            type="submit"
            className={`p-2 m-2 hover:bg-blue-400 group flex items-center rounded-md ${
              uploaded ? "bg-blue-500 " : "bg-blue-300 "
            }     text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer`}
          >
            {uploaded ? "Submit" : "Upload the reports"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
