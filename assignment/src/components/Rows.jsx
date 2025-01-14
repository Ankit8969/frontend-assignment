import React from "react";
import { COLUMNS } from "../utils";

const Rows = ({ rows }) => {
  return (
    <React.Fragment>
      {rows.map((project, index) => (
        <tr className="tableRow" key={index}>
          {
            COLUMNS.map((item) => <td>{project[item.key]}</td>)
          }
        </tr>
      ))}
    </React.Fragment>
  );
}

export default Rows;
