import React, { useState } from 'react';
import './documentUpload.css';
import { ButtonWithCancel } from '../../../basic/button/Button';
import Dropzone from './Dropzone';
import passportDoc from '../../../../assets/exampleImageSeeds/passport.json';
import driversLicenseDocs from '../../../../assets/exampleImageSeeds/driversLicense.json';
import governmentIdDocs from '../../../../assets/exampleImageSeeds/governmentId.json';
import { DocumentTypes, photoIdLabels } from './DocumentUpload';

const documentTypeDescriptions = {
  passport: 'Please provide the first page of your passport with your photo on it.',
  driversLicense: `Please provide the front and back of your driver's license.`,
  governmentId: `Please provide the front and back of your government issued ID.`,
  shared: 'Make sure the information on the image is clear and legible. Accepted file formats are: png, jpg, pdf, doc, docx.'
}

const UploadModal = ({ closeModal, onUpload, documentType, clearDocumentType, documentsOnForm }) => {
  const photoIdLabel = photoIdLabels[documentType];
  const twoDropzones = documentType !== DocumentTypes.PASSPORT;
  const dropzoneLabels = twoDropzones ? [`Front of ${photoIdLabel}`, `Back of ${photoIdLabel}`] : ['',''];
  const initialDocumentArray = Boolean(documentsOnForm) ? documentsOnForm.files : (twoDropzones ? ['','']: ['']);
  const [documents, loadDocuments] = useState(initialDocumentArray);

  const onDrop = index => acceptedFiles => {
    acceptedFiles.forEach((file, j) => {
      if (j > 0) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
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
    });
  };

  const onClearImage = index => () => {
    if (index === 0) {
      loadDocuments(['', documents[1]]);
    } else {
      loadDocuments([documents[0], '']);
    }
  }

  const loadExampleImage = () => {
    if (documentType === DocumentTypes.PASSPORT) { return loadDocuments(passportDoc) }
    if (documentType === DocumentTypes.DRIVERS_LICENSE) { return loadDocuments(driversLicenseDocs) }
    if (documentType === DocumentTypes.GOVERNMENT_ID) { return loadDocuments(governmentIdDocs) }
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
        <p className="UseExampleImage" onClick={loadExampleImage}>{`Use example image${twoDropzones ? 's' : ''}`}</p>
        <div className={`DropzoneContainer ${twoDropzones ? 'DropzoneGrid' : ''}`}>
          <Dropzone onDrop={onDrop(0)} onClear={onClearImage(0)} document={documents[0]} label={dropzoneLabels[0]} />
          {twoDropzones && <Dropzone onDrop={onDrop(1)} onClear={onClearImage(1)} document={documents[1]} label={dropzoneLabels[1]} />}
        </div>
        <div className="ModalButtonContainer">
          <ButtonWithCancel
            primaryColor="#9C27B0"
            disabled={!filesAreUploaded}
            onClick={() => {
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

export default UploadModal;