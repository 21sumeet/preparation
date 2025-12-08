import React from "react";
import "./style.css";

const PreviewFiles = ({ index, file, onDeleteFile }) => {
  return (
    <div className="preview">
      <img src={URL.createObjectURL(file)} alt={file.name} />
      <p>{file.name}</p>
      <p>{(file.size / 1024).toFixed(2)} KB</p>
      <button onClick={() => onDeleteFile(index)}> delete </button>
    </div>
  );
};

export default PreviewFiles;
