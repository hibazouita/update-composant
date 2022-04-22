import  {multiStepContext } from '../../StepContext';
import { useContext, useState } from 'react'
import axios from 'axios';
import { Box } from '@material-ui/core';
import './style.css';
import { Button } from 'react-md';
import { TextField} from '@mui/material';

const Retrain=()=>{
    const {setStep,userData,setUserData,files, setFiles,view,setView,filePath,filePath1,setFilePath1,filePath2,setFilePath2}=useContext(multiStepContext)
    const[Sentence1,setSentence1]=useState()
    const[Sentence2,setSentence2]=useState()
    const[erreursubmit,setErreursubmit]=useState()
    const handleSentence1=(event)=>{
        setSentence1(event.target.value)
      }
      const handleSentence2=(event)=>{
        setSentence2(event.target.value)
      }
      const evaluer=()=>{
        if (Sentence1.length>0){
            if(Sentence2.length>0){
                setErreursubmit('')
                const data = new FormData();
                data.append('sentence1', Sentence1);
                data.append('sentence2', Sentence2);
                axios.post('http://localhost:5000/retrain',data
     
                ).then(res=>{
                       console.log(res.data)
                }).catch(err=>{
                     console.log(err);

                  })
            }
            setSentence1('')
            setSentence2('')
        }
        else{
            setErreursubmit('remplir les inputs')

        }

        }
      
    return(
        <div className='retrain'>
            <p>Boucle de feedback</p>
              
            <Box><TextField label="sentence 1"  name="sentence1" className='input' value={Sentence1} onChange={handleSentence1}/></Box> 
            <br></br>
            <Box><TextField label="sentence 2"  name="sentence2" className='input' value={Sentence2} onChange={handleSentence2}/></Box> 
            <br></br>
            <Button  onClick={()=>evaluer}>Evaluer</Button>
            <br></br>
            {erreursubmit&&<div className='error-msg'>{erreursubmit}</div>}

        </div>
        


    )
}

export default Retrain
