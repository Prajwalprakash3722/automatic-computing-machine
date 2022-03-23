import React from "react";
import prisma from "../lib/prisma/index";
import { parseRole } from "../Misc/parseSociety";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
type Props = {
  level: number;
  LastStatus: boolean;
};
export default function TimeLineView(props: Props) {
  return (
    <>
      {props.level === 0 && (
        <>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {!props.LastStatus
                  ? `Rejected by ${parseRole(props.level + 2)}`
                  : `Approved by ${parseRole(props.level)}`}
              </h3>
            </div>
          </li>
        </>
      )}

      {props.level === 1 && (
        <>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level)}`}
                </h3>
              </h3>
            </div>
          </li>
          {!props.LastStatus && (
            <>
              <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                  <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    <button className="tooltip m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                      <CheckCircleIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pr-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {`Approved by ${parseRole(props.level + 1)}`}
                    </h3>
                  </h3>
                </div>
              </li>
              <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                  <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    {props.LastStatus ? (
                      <>
                        <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                          <CheckCircleIcon className="h-6 w-6" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="m-2 text-red-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                          <XCircleIcon className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pr-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {!props.LastStatus
                        ? `Rejected by ${parseRole(props.level + 2)}`
                        : `Approved by ${parseRole(props.level)}`}
                    </h3>
                  </h3>
                </div>
              </li>
            </>
          )}
        </>
      )}
      {props.level === 2 && (
        <>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 1)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level)}`}
                </h3>
              </h3>
            </div>
          </li>
          {!props.LastStatus && (
            <>
              <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                  <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    <button className="tooltip m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                      <CheckCircleIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pr-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {`Approved by ${parseRole(props.level + 1)}`}
                    </h3>
                  </h3>
                </div>
              </li>
              <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                  <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    {props.LastStatus ? (
                      <>
                        <button className=" m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                          <CheckCircleIcon className="h-6 w-6" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="m-2 text-red-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                          <XCircleIcon className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pr-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {!props.LastStatus
                        ? `Rejected by ${parseRole(props.level + 2)}`
                        : `Approved by ${parseRole(props.level)}`}
                    </h3>
                  </h3>
                </div>
              </li>
            </>
          )}
        </>
      )}
      {props.level === 3 && (
        <>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 2)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 1)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level)}`}
                </h3>
              </h3>
            </div>
          </li>
          {!props.LastStatus && (
            <>
              <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                  <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    <button className="tooltip m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                      <CheckCircleIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pr-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {`Approved by ${parseRole(props.level + 1)}`}
                    </h3>
                  </h3>
                </div>
              </li>
              <li className="relative mb-6 sm:mb-0">
                <div className="flex items-center">
                  <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    {props.LastStatus ? (
                      <>
                        <button className=" m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                          <CheckCircleIcon className="h-6 w-6" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="m-2 text-red-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                          <XCircleIcon className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div className="mt-3 sm:pr-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {!props.LastStatus
                        ? `Rejected by ${parseRole(props.level + 2)}`
                        : `Approved by ${parseRole(props.level)}`}
                    </h3>
                  </h3>
                </div>
              </li>
            </>
          )}
        </>
      )}
      {props.level === 4 && (
        <>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 3)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 2)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 1)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level)}`}
                </h3>
              </h3>
            </div>
          </li>
        </>
      )}
      {props.level === 5 && (
        <>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className=" m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 4)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className=" m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 3)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 2)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level - 1)}`}
                </h3>
              </h3>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <button className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pr-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {`Approved by ${parseRole(props.level)}`}
                </h3>
              </h3>
            </div>
          </li>
        </>
      )}
    </>
  );
}
