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
import { TrashIcon } from "@heroicons/react/solid";

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
    assets: [],
    LastStatus: false,
    level: 1,
    ApprovedComments: [],
    RejectedComments: [],
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
    setData(sid ? data : { ...data, level: 3 });
  }, [sid]);
  /**
   *
   * @param url
   * @param type
   * @description queues the files to be uploaded to firebase storage
   */
  const pushData = (url: string, type: string) => {
    setData({
      ...data,
      assets: [...data.assets, { url, type }],
    });
  };
  /**
   *
   * @param index
   * @description dequeues the files to be uploaded to firebase storage
   */
  const handleDelete = (index: number) => {
    setData({
      ...data,
      assets: data.assets.filter((_, i) => i !== index),
    });
  };

  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState<File | null>(
    new File([], "", { type: "application/pdf" })
  );

  const createUpload = async (type: string) => {
    if (data.event !== "" && data.society !== "") {
      const imageRef = await ref(
        storage,
        `${data.society}/${data.event}/${type}/${file!.name}`
      );
      await uploadBytes(imageRef, file!)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              pushData(url, type);
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
    } else {
      toast.error("Please fill in all the fields");
    }
  };

  const handleUpload = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    try {
      toast.promise(
        createUpload(type),
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
          {sid === 1 ? (
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
          <div className="flex flex-col">
            <label
              htmlFor="file"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Upload your reports here
            </label>
            <div className="flex flex-row">
              <input
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file"
                id="file"
                type="file"
                onChange={(e) => {
                  if (
                    e.target.files![0].type === "application/pdf"
                    // || e.target.files![0].type === ""
                  ) {
                    setFile(e.target.files![0] as File);
                  } else {
                    toast.error("Please upload a valid file");
                  }
                }}
                placeholder="Event Reports"
                required
              />
              <button
                onClick={(e) => {
                  handleUpload(e, "report");
                }}
                className="p-2 m-2 hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer"
              >
                Upload Files
              </button>
            </div>
            <label
              htmlFor="file"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Upload your Bills here
            </label>
            <div className="flex flex-row">
              <input
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file"
                id="file"
                type="file"
                onChange={(e) => {
                  if (
                    e.target.files![0].type === "application/pdf"
                    // || e.target.files![0].type === ""
                  ) {
                    setFile(e.target.files![0] as File);
                  } else {
                    toast.error("Please upload a valid file");
                  }
                }}
                placeholder="Event Reports"
                required
              />
              <button
                onClick={(e) => {
                  handleUpload(e, "bills");
                }}
                className="p-2 m-2 hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer"
              >
                Upload Bills
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-fit bg-slate-200 p-4 rounded-lg justify-around gap-2">
              <h1 className="text-center m-2">
                Total Files Uploaded : {data.assets.length}
              </h1>
              {data.assets.map((a: any, index) => (
                <div
                  key={index}
                  className=" flex flex-row items-center justify-around mb-2"
                >
                  <div className="gap-4 font-bold text-lg text-white text-center flex flex-row justify-between">
                    <a href={a.url} target="blank">
                      <div className="p-2 w-full justify-center border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        File-{index + 1}
                      </div>
                    </a>
                    <span className="flex p-2 items-center justify-center border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      <TrashIcon
                        className="h-6 w-6"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Remarks...."
            className="focus:outline-none w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            onChange={(e) =>
              setData({
                ...data,
                ApprovedComments: [
                  ...data.ApprovedComments,
                  {
                    comment: e.target.value,
                    by: localStorage.getItem("role") as string,
                  },
                ],
              })
            }
            required
          />
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
