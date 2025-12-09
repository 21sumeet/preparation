import React, { useState } from "react";
import "./style.css";
import PreviewFiles from "./PreviewFiles";

const DragandDrop = () => {
  const [files, setFiles] = useState([]);
  const [isdraging, setdraging] = useState(false);

  function onhandlechange(event) {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    console.log("File dropped");
    console.log(selectedFiles);
  }

  function onDeleteFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDragOver(e) {
    e.preventDefault();
    setdraging(true);
  }

  function handleDragLeave() {
    setdraging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setdraging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  }

  return (
    <div>
      <h3>Drag and Drop Image Upload Component</h3>

      <div
        className={`dragdrop-container ${isdraging ? "highlight" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
          <PreviewFiles
            key={index}
            index={index}
            file={file}
            onDeleteFile={onDeleteFile}
          />
        ))}
      </div>
    </div>
  );
};

export default DragandDrop;
