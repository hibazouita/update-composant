import { useContext, useState } from 'react'
import './style.css';
import dragDropIcon from './file-download.png'
import FileItem from '../FileItem/FileItem';
//import { Button } from 'react-md';
import  {multiStepContext } from '../../StepContext';
import "bootstrap/dist/css/bootstrap.css";
//import { TextField } from '@material-ui/core';
// Plugins
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker

const Upload=({inputnama,file})=>{

  const {setStep,userData,setUserData,files, setFiles,view, setView,sommaire,setSommaire,pdfFileError, setPdfFileError,filePath,setFilePath}=useContext(multiStepContext)
  //const [files, setFiles] = useState([])
  const fileType=['application/pdf'];
 // const [pdfFileError, setPdfFileError]=useState('');
  const [pdf,setPdf]=useState([])
  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
    

  }
  // const handleSommaire=(e)=>{
  //   setSommaire(e.target.result)
  // }
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if(file){
      if(file&&fileType.includes(file.type)){
        file.isUploading = true;
        let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) =>{
              if (pdf.length==0){
                let f=e.target.result
             
                setFiles([...files, file])
                setView([...view,f])
                setPdf([...pdf,file])
                setPdfFileError('');

              }
              else{
                setPdfFileError('Max un seul pdf pour chaque input');


              }
              
                
              
              
            }
      }
      else{
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
    
  }
  
  

  return (

     <>
     <div className='contenu'>

                <div className="file-card">


                <div className="file-inputs">
                    <input type="file"  multiple={false} onChange={uploadHandler} className="input-file" name={inputnama} />

                    <button className='btn-icon'>
                     
                            <img src={dragDropIcon} alt="icon" width={40} height={40}  />
                        
                    </button>                       
                </div>

                <p className="main">Supported files</p>
                <p className="info"> Only PDF</p>

            </div>
            <br></br>
            {
              file&&<>
              <FileItem
                    key={file.name}
                    file={file}
                    deleteFile={removeFile} />
           
              </>

            }
            </div>
            

                

        </>
            

   

        
        
      

  );
    

}
export default Upload;