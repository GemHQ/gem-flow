import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });

  return (
    <div className={getClassName("Dropzone", isDragActive)} {...getRootProps()}>
      <input className="DropzoneInput" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="DropzoneContent">Release to drop the files here</p>
        ) : (
          <p className="DropzoneContent">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

const getClassName = (className, isActive) => {
  if (!isActive) return className;
  return `${className} ${className}-active`;
};

export default Dropzone;