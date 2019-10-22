import React, { useState } from 'react';
import './documentUpload.css';
import Button from '../../basic/button/Button';
import Dropzone from './Dropzone';
import DropdownSelector from '../../basic/dropdownSelector/DropdownSelector';


// example document structure 
// const profileDocument = {
//   type: 'passport',
//   description: 'My passport',
//   files: [
//     {
//       data: passportFile,
//       media_type: 'image/png',
//       description: 'the file description',
//       orientation: 'front',
//     },
//   ],
// };

const DocumentUpload = ({ isUploaded, onUpload, onClear }) => {
  const [isUploading, setIsUploading] = useState(false);


  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        onUpload({ id: cuid(), src: e.target.result });
      };
      reader.readAsDataURL(file);
      return file;
    });
  });
  
  return (
    <div className="MaxButtonWidth">
      {
        isUploaded ?
        <p></p>
        :
        <>
          <Button onClick={() => setIsUploading(true)} type="button">Upload</Button>
          {
            isUploading &&
            <UploadModal
              closeModal={() => setIsUploading(false)}
            />
          }
        </>
      }
    </div>
  )
}

const dropdownPlaceholder = 'Select document type';
const dropdownOptions = [
  { value: 'passport', label: 'Passport', className: 'OnrampColor MediumTextSize' },
  { value: 'governmentId', label: 'Government Issued ID', className: 'OnrampColor MediumTextSize' },
];
const documentTypeDescriptions = {
  passport: 'A passport',
  governmentId: `A government issued id such as a driver's license`
}

const UploadModal = ({ closeModal }) => {
  const [documentType, setDocumentType] = useState(dropdownPlaceholder);

  return (
    <div className="UploadModal">
      <div className="UploadModalBackground" onClick={closeModal} />
      <div className="ModalBox">
        <h2 className="ModalTitle">Upload Photo ID</h2>
        <DropdownSelector
          selectedOption={documentType}
          selectOption={option => setDocumentType(option)}
          options={dropdownOptions}
          selectedClassName={documentType === dropdownPlaceholder ? 'LightGreyText ThinText MediumTextSize' : 'BlackText ThinText MediumTextSize'}
        />
        <p className="DocumentTypeDescription">{documentTypeDescriptions[documentType]}</p>
        <Dropzone />
        <div className="ModalButtonContainer">
          <Button
            disabled={documentType === dropdownPlaceholder}
            onClick={() => {
              closeModal();
            }}
          >Save</Button>
        </div>
      </div>
    </div>
  )
}

export default DocumentUpload;