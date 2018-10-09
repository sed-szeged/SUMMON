import React from "react";
import GridFSDownload from "./GridFSDownload";
export default props => {
  if (props.gridfs) {
    const gridfs = Object.assign({}, props.gridfs);
    return (
      <table>
        <thead>
          <tr>
            <th>Chunk Size</th>
            <th>Content Type</th>
            <th>Upload Date</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{gridfs.chunkSize}</td>
            <td>{gridfs.contentType}</td>
            <td>{gridfs.uploadDate}</td>
            <td>
              <GridFSDownload id={gridfs._id} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    return <p>No table</p>;
  }
};
