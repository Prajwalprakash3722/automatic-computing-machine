import React from "react";
import { Transaction } from "../types";
import TimeLineView from "./TimeLineView";

type Props = {
  transaction: Transaction;
};

const TimeLine = (props: Props) => {
  return (
    <>
      <ol className="items-center sm:flex">
        <TimeLineView
          level={props.transaction.level}
          LastStatus={props.transaction.LastStatus}
        />
      </ol>
    </>
  );
};

export default TimeLine;
