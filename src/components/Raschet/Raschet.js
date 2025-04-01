import React, { useState } from "react";
import parse from 'html-react-parser';
function Raschet() {

    const [fileList, setFileList] = useState(null);
    const [files, setFiles] = useState([]);
    const [result, setResult] = useState(null);

    const handleFileChange = (evt) => {
      setFileList(evt.target.files);
      setFiles([...evt.target.files])
    };
   
    React.useEffect(()=> {
        if (files.length) {
            console.log('Какого то фига мы тут');
            const fileReader = new FileReader(); 
            fileReader.readAsText(files[0]);
            const parser = new DOMParser(); // Инициализируем парсер
            fileReader.onload = function(e) {
                const contents = e.target.result; 
                console.log('контент', contents)
                setResult(contents);
                console.log(parser.parseFromString(contents, "text/html").querySelector('table'));
            }; 
        }
    }, [files, result])


    return (
        <div className="flex">
            <form id='fileloadform'>
                <input className="bg-primary-lightgray outline-none border-1 border-primary-green border-dotted" type="file" onChange={handleFileChange} multiple />

                <ul>
                  
                </ul>

                {/*<Button type='button' onClick={handleUploadClick}>Upload</Button>*/}
            </form>
            <div className="">
               {result && parse(result)}
            </div>
        </div>
    );
}

export default Raschet;

