import * as React from 'react';
import { useContext, useState, useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer';

import { Worker } from '@react-pdf-viewer/core'; // install this library
import { Viewer } from '@react-pdf-viewer/core'; // install this library

import './style.css';
import FileItem from '../FileItem/FileItem';
import Upload from '../upload/Upload';
import { Button } from 'react-bootstrap';
//import { Button } from 'react-md';
import  {multiStepContext } from '../../StepContext';
import "bootstrap/dist/css/bootstrap.css";
//import { TextField } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { TextField} from '@mui/material';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Box } from '@material-ui/core';
const FileUpload=()=>{
  
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const {setStep,userData,setUserData,files, setFiles,view, setView,sommaire,setSommaire,pdfFileError, setPdfFileError,filePath,setFilePath,filePath1,setFilePath1,filePath2,setFilePath2}=useContext(multiStepContext)
//startt
  const fileType=['application/pdf'];
  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))

  }
  const handleSommaire=(event)=>{
    setSommaire(event.target.value)
  }
 
  const nextStep=()=>{
    if(files.length==2){

    const formData = new FormData();
    console.log(files)
    formData.append('file1', files[0]);
    formData.append('file2', files[1]);
    formData.append('sommaire',sommaire)
    console.log(sommaire)
    axios.post('http://localhost:5000/uploadfile',formData
     
       )
       .then(res=>{

         console.log(res);
         const {filePath1,filePath2}=res.data
         setFilePath(res.data)
         setFilePath1(filePath1)
         setFilePath2(filePath2)

         console.log(res.data)
       }).catch(err=>{
        console.log(err);

       })
            setStep(2)



    }
    else{
      setPdfFileError('Select deux PDF 2');


    }
  }
   
  return (
    <div className="upload" >
      <br></br>
      <h3>Chargement des document</h3>
      <br></br>

    
                 <div > 
                  

                   <TextField label="Entrer ici Sommaire / plan/ Liste Des matière "  name="sommaire" className='input-sommaire' value={sommaire} onChange={handleSommaire}/>
                   
                 
                  
                  
                 <Grid container className='wrap-center'>
                    <Grid item lg={6}>
                   
                          <Upload inputnama="file1" file={files[0]}/>
                    </Grid>
                 <Grid item lg={6}>
                             <Upload inputnama="file2" file={files[1]}/>
                     </Grid>

                   </Grid>
                   {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
   
        <Button onClick={nextStep}> Next </Button>
  
        

        <br></br>
    
      
        
    </div>
    </div>
  );
    

}
export default FileUpload;