import React from "react";
import { COLUMNS } from "../utils";

const Columns = () => {
  return (
    <React.Fragment>
      {COLUMNS.map((column, ind) => <th key={ind}> {column.value} </th> )}
    </React.Fragment>
  );
}

export default Columns;
