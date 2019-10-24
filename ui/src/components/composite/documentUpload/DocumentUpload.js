import React, { useState } from 'react';
import './documentUpload.css';
import { ButtonWithCancel } from '../../basic/button/Button';
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


const photoIdLabels = {
  passport: 'Passport',
  driversLicense: `Driver's License`,
  governmentId: 'Government Issued ID'
}
const photoIdOptions = [
  { value: 'passport', label: photoIdLabels.passport, className: 'OnrampColor MediumTextSize' },
  { value: 'driversLicense', label: photoIdLabels.driversLicense, className: 'OnrampColor MediumTextSize' },
  { value: 'governmentId', label: photoIdLabels.governmentId, className: 'OnrampColor MediumTextSize' },
];
const dropdownPlaceholder = 'Choose ID Type';


const DocumentUpload = ({ isUploaded, onUpload, onClear }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [documentType, setDocumentType] = useState(dropdownPlaceholder);
  
  const uploadToProfileForm = files => onUpload({
    files,
    type: documentType,
    description: photoIdLabels[documentType],
  });
  
  return (
    <div>
      {
        isUploaded ?
        <p><span className="OnrampColor BoldText Pointer" onClick={onClear}>clear</span></p>
        :
        <>
          <DropdownSelector
            selectedOption={documentType}
            selectOption={option => {
              setDocumentType(option);
              setIsUploading(true);
            }}
            options={photoIdOptions}
            selectedClassName={documentType === dropdownPlaceholder ? 'LightGreyText ThinText MediumTextSize' : 'BlackText ThinText MediumTextSize'}
          />
          {
            isUploading &&
            <UploadModal
              documentType={documentType}
              onUpload={uploadToProfileForm}
              closeModal={() => setIsUploading(false)}
            />
          }
        </>
      }
    </div>
  )
}

const documentTypeDescriptions = {
  passport: 'Please provide the first page of your passport with your photo on it.',
  driversLicense: `Please provide the front and back of your driver's license.`,
  governmentId: `Please provide the front and back of your government issued ID.`,
  shared: 'Make sure the information on the image is clear and legible. Accepted file formats are: png, jpg, pdf, doc, docx.'
}

const UploadModal = ({ closeModal, onUpload, documentType }) => {
  const twoDropzones = documentType !== 'passport';
  const initialDocumentArray = twoDropzones ? ['','']: [''];
  const [documents, loadDocuments] = useState(initialDocumentArray);

  const onDrop = index => acceptedFiles => {
    acceptedFiles.forEach((file, j) => {
      if (j > 0) return;
      const reader = new FileReader();
      reader.onload = e => {
        const newDocument = {
          data: e.target.result,
          media_type: file.type,
          description: file.name,
          orientation: index === 0 ? 'front' : 'back',
        };
        if (index === 0) {
          loadDocuments([newDocument, documents[1]]);
        } else {
          loadDocuments([documents[0], newDocument]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onClear = index => () => {
    if (index === 0) {
      loadDocuments(['', documents[1]]);
    } else {
      loadDocuments([documents[0], '']);
    }
  }

  return (
    <div className="UploadModal">
      <div className="UploadModalBackground" onClick={closeModal} />
      <div className="ModalBox">
        <div className="ModalBoxHeader">
          <h2 className="ModalTitle">{`Upload ${photoIdLabels[documentType]}`}</h2>
        </div>
        <p className="DocumentTypeDescription">{`${documentTypeDescriptions[documentType]} ${documentTypeDescriptions.shared}`}</p>
        <div className="DropzonesContainer">
          <Dropzone onDrop={onDrop(0)} onClear={onClear(0)} document={documents[0]} />
          {twoDropzones && <Dropzone onDrop={onDrop(1)} onClear={onClear(1)} document={documents[1]} />}
        </div>
        <div className="ModalButtonContainer">
          <ButtonWithCancel
            primaryColor="#9C27B0"
            disabled={!documents.length}
            onClick={() => {
              onUpload(documents);
              closeModal();
            }}
            onCancel={closeModal}
          >Save</ButtonWithCancel>
        </div>
      </div>
    </div>
  )
}

export default DocumentUpload;