import React from "react";

const NoData = ({ rows }) => {
  return (
    <React.Fragment>
      {rows.length === 0 && (
        <tr>
          <td colSpan="3">No projects found</td>
        </tr>
      )}
    </React.Fragment>
  );
}

export default NoData;
