import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, documents }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className={getClassName("Dropzone", isDragActive)} {...getRootProps()}>
      {
        documents.length ?
        <>
          <img src={documents[0]} className="DocumentImage" />
          <p>{documents[0].name}</p>
        </>
        :
        <>
          <input className="DropzoneInput" {...getInputProps()} />
          <div className="text-center">
            {isDragActive ? (
              <p className="OnrampColor ExtraBold">Release to drop the files here</p>
            ) : (
              <p className="OnrampColor ExtraBold">
                Drag 'n' drop some files here, or <span className="Underline">click</span> to select files
              </p>
            )}
          </div>
        </>
      }
    </div>
  );
};

const getClassName = (className, isActive) => {
  if (!isActive) return className;
  return `${className} ${className}-active`;
};

export default Dropzone;