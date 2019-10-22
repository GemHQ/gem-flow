import React from 'react';
import Button from '../../basic/button/Button';


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

const DocumentUpload = ({ isUploaded, isUploading, onUpload, onClear }) => {
  const [documents, setDocuments] = useState([]);
  return (
    <div className="MaxButtonWidth">
      {
        isUploaded ?
        <p></p>
        :
        <Button onClick={() => {}} type="button">Upload</Button>
      }
    </div>
  )
}

export default DocumentUpload;