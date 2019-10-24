import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, onClear, document }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className={getClassName("Dropzone", isDragActive, Boolean(document))} {...getRootProps()}>
      {
        Boolean(document) ?
        <>
          <img src={document.data} className="DocumentImage" />
          <div className="Flex SpaceBetween">
            <p className="SmallText">{document.description}</p>
            <p className="Pointer" onClick={onClear}>Clear file</p>
          </div>
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

const getClassName = (className, isActive, hasDocument) => {
  if (!isActive) return `${className} ${hasDocument ? '' : 'Pointer'}`;
  return `${className} ${className}-active`;
};

export default Dropzone;