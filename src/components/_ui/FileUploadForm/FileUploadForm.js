import { Button } from '@mui/joy';
import {  useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filesLoad } from '../../services/actions/orders';

function FileUploadForm({orderId, handleFilesLoaded}) {
  const [fileList, setFileList] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (evt) => {
    setFileList(evt.target.files);
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }
    // Create FormData object and append files
    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    dispatch(filesLoad(orderId, data));
    formRef.current.reset();
    handleFilesLoaded();
  };

  // files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];
  const formRef = useRef();

  return (
    <form id='fileloadform' ref={formRef}>
      <input className="bg-primary-lightgray outline-none border-1 border-primary-green border-dotted" type="file" onChange={handleFileChange} multiple />

      <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.name} - {file.type}
          </li>
        ))}
      </ul>

      <Button type='button' onClick={handleUploadClick}>Upload</Button>
    </form>
  );
}

export default FileUploadForm;