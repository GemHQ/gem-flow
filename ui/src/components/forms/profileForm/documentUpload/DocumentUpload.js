import React, { useState } from 'react';
import './documentUpload.css';
import UploadModal from './UploadModal';
import DropdownSelector from '../../../basic/dropdownSelector/DropdownSelector';
import Input from '../../../basic/input/Input';


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

export const DocumentTypes = {
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'driversLicense',
  GOVERNMENT_ID: 'governmentId'
}

export const photoIdLabels = {
  [DocumentTypes.PASSPORT]: 'Passport',
  [DocumentTypes.DRIVERS_LICENSE]: `Driver's License`,
  [DocumentTypes.GOVERNMENT_ID]: 'Government Issued ID'
}

const photoIdOptions = [
  { value: DocumentTypes.PASSPORT, label: photoIdLabels[DocumentTypes.PASSPORT], className: 'OnrampColor MediumTextSize' },
  { value: DocumentTypes.DRIVERS_LICENSE, label: photoIdLabels[DocumentTypes.DRIVERS_LICENSE], className: 'OnrampColor MediumTextSize' },
  { value: DocumentTypes.GOVERNMENT_ID, label: photoIdLabels[DocumentTypes.GOVERNMENT_ID], className: 'OnrampColor MediumTextSize' },
];

const dropdownPlaceholder = 'Choose ID Type';


const DocumentUpload = ({ onUpload, onClear, document }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [documentType, setDocumentType] = useState(dropdownPlaceholder);
  const documentNames = document && document.files.map(d => d.description).join(', ');
  
  const uploadToProfileForm = files => onUpload({
    // files: files.map(f => window.atob(f)),
    files,
    type: documentType,
    description: photoIdLabels[documentType],
  });
  
  return (
    <div>
      {
        Boolean(document) ?
        <div className="Relative">
          <Input className="DocumentImageInput" value={documentNames} placeholder="Photo ID" readOnly={true} />
          <RemoveEdit onRemove={onClear} onEdit={() => setIsUploading(true)} />
        </div>
        :
        <DropdownSelector
          selectedOption={documentType}
          selectOption={option => {
            setDocumentType(option);
            setIsUploading(true);
          }}
          options={photoIdOptions}
          selectedClassName={documentType === dropdownPlaceholder ? 'LightGreyText ThinText MediumTextSize' : 'BlackText ThinText MediumTextSize'}
        />
      }
      {
        isUploading &&
        <UploadModal
          documentsOnForm={document}
          documentType={documentType === dropdownPlaceholder ? DocumentTypes.PASSPORT : documentType}
          onUpload={uploadToProfileForm}
          closeModal={() => setIsUploading(false)}
          clearDocumentType={() => setDocumentType(dropdownPlaceholder)}
        />
          }
    </div>
  )
}

const RemoveEdit = ({ onRemove, onEdit }) => (
  <div className="RemoveEditContainer">
    <p className="Remove" onClick={onRemove}>Remove</p>
    <p className="Edit" onClick={onEdit}>Edit</p>
  </div>
)

export default DocumentUpload;