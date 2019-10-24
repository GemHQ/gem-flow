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
              clearDocumentType={() => setDocumentType(dropdownPlaceholder)}
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

const UploadModal = ({ closeModal, onUpload, documentType, clearDocumentType }) => {
  const photoIdLabel = photoIdLabels[documentType];
  const twoDropzones = documentType !== 'passport';
  const dropzoneLabels = twoDropzones ? [`Front of ${photoIdLabel}`, `Back of ${photoIdLabel}`] : ['',''];
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
          const newDocuments = twoDropzones ? [newDocument, documents[1]] : [newDocument];
          loadDocuments(newDocuments);
        } else {
          loadDocuments([documents[0], newDocument]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onClearImage = index => () => {
    if (index === 0) {
      loadDocuments(['', documents[1]]);
    } else {
      loadDocuments([documents[0], '']);
    }
  }

  const cancelModal = () => {
    closeModal();
    clearDocumentType();
  }

  const filesAreUploaded = documents.reduce((acc, doc) => acc && Boolean(doc), true);

  return (
    <div className="UploadModal">
      <div className="UploadModalBackground" onClick={cancelModal} />
      <div className="ModalBox">
        <div className="ModalBoxHeader">
          <h2 className="ModalTitle">{`Upload ${photoIdLabel}`}</h2>
        </div>
        <p className="DocumentTypeDescription">{`${documentTypeDescriptions[documentType]} ${documentTypeDescriptions.shared}`}</p>
        <div className={`DropzoneContainer ${twoDropzones ? 'DropzoneGrid' : ''}`}>
          <Dropzone onDrop={onDrop(0)} onClear={onClearImage(0)} document={documents[0]} label={dropzoneLabels[0]} />
          {twoDropzones && <Dropzone onDrop={onDrop(1)} onClear={onClearImage(1)} document={documents[1]} label={dropzoneLabels[1]} />}
        </div>
        <div className="ModalButtonContainer">
          <ButtonWithCancel
            primaryColor="#9C27B0"
            disabled={!filesAreUploaded}
            onClick={() => {
              console.log(JSON.stringify(documents))
              onUpload(documents);
              closeModal();
            }}
            onCancel={cancelModal}
          >Save</ButtonWithCancel>
        </div>
      </div>
    </div>
  )
}

export default DocumentUpload;