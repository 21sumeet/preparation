import React, { useState } from "react";
import "./style.css";
import PreviewFiles from "./PreviewFiles";

const DragandDrop = () => {
  const [files, setFiles] = useState([]);

  function onhandlechange(event) {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    console.log("File dropped");
    console.log(selectedFiles);
  }
  function onDeleteFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h3>Drag and Drop Image Upload Component</h3>

      <div className="dragdrop-container">
        <h5>Drag and Drop file here</h5>

        <label htmlFor="dragdrop-input" className="dragdrop-label">
          Click to upload
        </label>

        <input
          id="dragdrop-input"
          type="file"
          multiple
          className="dragdrop-input"
          onChange={onhandlechange}
        />
      </div>

      <div>
        <h4>Uploaded Files:</h4>
        {files.map((file, index) => (
          <div key={index}>
            <PreviewFiles
              index={index}
              file={file}
              onDeleteFile={onDeleteFile}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragandDrop;
