import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, onClear, document, label }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className="Relative FlexCenter">
      <div className={getClassName("Dropzone", isDragActive, Boolean(document))} {...getRootProps()}>
        {
          Boolean(document) ?
          <div className="UploadedDocument">
            <img src={document.data} className="DocumentImage" />
            <div className="Flex SpaceBetween">
              <p className="DocumentImageName">{document.description}</p>
              <p className="SmallText Pointer GreyText" onClick={onClear}>Clear file</p>
            </div>
          </div>
          :
          <>
            <input className="DropzoneInput" {...getInputProps()} />
              {isDragActive ? (
                <p className="OnrampColor ExtraBold TextCenter LineHeight">Release to drop the files here</p>
              ) : (
                <p className="OnrampColor ExtraBold TextCenter LineHeight">
                  Drag 'n' drop some files here, or <span className="Underline">click</span> to select files
                </p>
              )}
          </>
        }
      </div>
      <p className="DropzoneLabel">{label}</p>
    </div>
  );
};

const getClassName = (className, isActive, hasDocument) => {
  if (!isActive) return `${className} ${hasDocument ? '' : 'Pointer'}`;
  return `${className} ${className}-active`;
};

export default Dropzone;