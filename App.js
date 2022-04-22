import React, { useState ,useContext} from 'react'
import './index.css';
import FileUpload from './components/fileUpload/fileUpload';
import MatchingDoc from './components/Matching-doc/Matching-doc';
import Step3 from './components/step3/step3';
import Retrain from './components/retrain/Retrain';
import {Stepper ,StepLabel,Step} from '@material-ui/core';
import {multiStepContext} from "./StepContext"
function App() {
  const {currentStep,finalData}= useContext(multiStepContext)
  const showStep=(step)=>{
    switch(step){
      case 1: 
      return <FileUpload/>
      case 2: 
      return <MatchingDoc/>
      case 3 : 
      return <Retrain/>
    }

  }
  return(
    <div className='App' >
    <div className='center-stepper'>
      <Stepper style={{width:'100%'}} activeStep={currentStep-1} orientation="horizontal">
       <Step>
         <StepLabel>Chargement </StepLabel>
       </Step>
       <Step>
         <StepLabel>Matching</StepLabel>
       </Step>
       <Step>
         <StepLabel>Done</StepLabel>
       </Step>
      </Stepper>
        {showStep(currentStep)}
      </div>    
    

  </div>
  )
}

export default App;
