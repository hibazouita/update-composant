import  {multiStepContext } from '../../StepContext';
import { useContext, useState, useRef, useEffect } from 'react'
import { TextField} from '@mui/material';

import { Button } from 'react-md';
import Grid from '@mui/material/Grid';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import WebViewer from '@pdftron/webviewer';
import Retrain from '../retrain/Retrain';
const MatchingDoc=()=>{
const {setStep,userData,setUserData,files, setFiles,view,setView,filePath,filePath1,setFilePath1,filePath2,setFilePath2}=useContext(multiStepContext)
const defaultLayoutPluginInstance = defaultLayoutPlugin();
const viewer = useRef(null);
const viewer2 = useRef(null);



  
  
//end
// if using a class, equivalent of componentDidMount
  
   

useEffect(() => {

    WebViewer(

      {

        path: 'lib',

        initialDoc:filePath1                                                                              

      },

      viewer.current,

    ).then((instance) => {

      const { documentViewer, annotationManager, Annotations } = instance.Core;



      documentViewer.addEventListener('documentLoaded', () => {

        const rectangleAnnot = new Annotations.RectangleAnnotation({

          PageNumber: 1,

          // values are in page coordinates with (0, 0) in the top left

          X: 100,

          Y: 150,

          Width: 200,

          Height: 50,

          Author: annotationManager.getCurrentUser()

        });



        annotationManager.addAnnotation(rectangleAnnot);

        // need to draw the annotation otherwise it won't show up until the page is refreshed

        annotationManager.redrawAnnotation(rectangleAnnot);

      });

    });

  }, [filePath1]);
  useEffect(() => {

    WebViewer(

      {

        path: 'lib',

        initialDoc:filePath2                                                                             

      },

      viewer2.current,

    ).then((instance) => {

      const { documentViewer, annotationManager, Annotations } = instance.Core;



      documentViewer.addEventListener('documentLoaded', () => {

        const rectangleAnnot = new Annotations.RectangleAnnotation({

          PageNumber: 1,

          // values are in page coordinates with (0, 0) in the top left

          X: 100,

          Y: 150,

          Width: 200,

          Height: 50,

          Author: annotationManager.getCurrentUser()

        });



        annotationManager.addAnnotation(rectangleAnnot);

        // need to draw the annotation otherwise it won't show up until the page is refreshed

        annotationManager.redrawAnnotation(rectangleAnnot);

      });

    });

  }, [filePath2]);
const returnFile=()=>{
    setStep(1)
    setFiles(...files)
}

    return(
        <div className='pdf-center'>
          <Grid container rowSpacing={3}  columnSpacing={2}>
          <Grid item md={2}>
              <Retrain/>

            </Grid>

                    <Grid item md={5}>
                    {filePath1.length>0 ?(
                <>
                
                <div className="webviewer" ref={viewer}></div> 
                
                </>

            ):("waitt.....")}
                   
                    </Grid>
                 <Grid item md={5}>
                 {filePath2.length>0 ?(
                <>
                
                <div className="webviewer" ref={viewer2}></div> 
                
                </>
                

            ):("waitt.....")}                     </Grid>
            

                   </Grid>
            
            

             




                            
        {/* {
            filePath ? (
                <>
                  <div className='pdf-container'>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                <Viewer fileUrl={filePath.filePath1}
                                       plugins={[defaultLayoutPluginInstance]} />
                            </Worker>
                        
                    </div>
                    <div className='pdf-container'>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                <Viewer fileUrl={filePath.filePath2}
                                       plugins={[defaultLayoutPluginInstance]} />
                            </Worker>
                        
                    </div>
                </>

            ): "waitinggg" }*/}
        <br></br>
        <Button onClick={()=>setStep(1)} >Previous</Button>
        <Button onClick={()=>setStep(3) }>Next</Button>
        

        </div>
    )
}
export default MatchingDoc
