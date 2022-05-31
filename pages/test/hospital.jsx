import * as React from 'react';
import Layout from "../../components/Layout"
import { useSession, signOut, getSession } from "next-auth/react"
import Router from 'next/router'
import { useEffect, useState } from "react"
import { Button, CircularProgress, TextField } from "@mui/material"
import CustomInput from "../../components/forms/customInput"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from 'axios';


const Individual = ({session}) => {
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState(Date.now())
    const [remainingTests, setRemainingTests] = useState(0);
    const [loadingTests, setLoadingTests] = useState(0);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [testFile, setTestFile] = useState(null);
    const [gettingResult, setGettingResult] = useState(false);
    const [testResult, setTestResult] = useState('');
    const [testResultLink, setTestResultLink] = useState(null);
    const setFile = (e) => {
      if(e.target){
        setUploadedFileName(e.target.files[0].name);
        setTestFile(e.target.files[0]);
      }
    }

    const getResults = async () => {
      if(patientName.length && date !== 0 && testFile !== null){
        setGettingResult(true);
        let formData = new FormData();
        formData.append('file', testFile);
        console.log(testFile);
        await axios.post('/covid_api',
          formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
        .then(async function (response) {
          console.log(response.data);
          setGettingResult(false);
          setUploadedFileName(null);
          setTestFile(null);
          setTestResult(response.data);
          await axios.post('/api/test/take',
          {email:session.user.email, testResult: response.data, patientName, dob: date, hospital: true},
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(function (response){
            setRemainingTests(response.data.remainingTests);
            setTestResultLink(response.data.id);
          })
     })
      } else {
        alert('Image or Patient Name is Missing please Check')
      }
    }
    useEffect(async ()=>{
        if(!session){
            return Router.push('/')
        }
    setLoadingTests(1);
    await axios.post('/api/user/remaining',
    JSON.stringify({
     email:session.user.email
     }),{
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
     })
     .then(function (response) {
       setRemainingTests(response.data.remaining);
       setLoadingTests(0);
     })
    },[])
return testResult.length?  (<div><Layout session={session}>
  <div className='page'>
    <b>Patient Name:</b> {patientName}
    <br></br>
    <b>Test Result:</b> {testResult!=='No Covid'?'Positive':'Negative'}
    <br></br>
    <div>{testResult!=='No Covid'?'Severity: '+testResult:''} </div> 
    
    <br />
    <Button variant="outlined" onClick={()=>setTestResult('')}>Take Another</Button>

    <div className='mt-5'>Your Result was saved and Can be Viewed at: <a href={'https://detectcovid.tech/result/hospital/'+testResultLink} className='text-blue-500'>here</a></div>
  </div>
  </Layout></div>): (
    <Layout session={session}>
      <div className="page ">
    <p>Remaining Tests : {loadingTests?<CircularProgress size={'0.8rem'} />:remainingTests}</p>
      <CustomInput name={'Patient Name'} state={patientName} setState={setPatientName}/>
        <div className="mt-5">
        <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="Date of Birth"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        </div>

        <div className="mt-5">
            <Button
            variant="contained"
            component="label"
            >
            {uploadedFileName ? uploadedFileName : 'Upload CT-Scan'}
            <input
            type="file"
            accept="image/png"
            onChange={setFile}
            hidden
            />
            </Button>
        </div>
        <div className="mt-5">
            {gettingResult?<CircularProgress /> : <Button variant="outlined" onClick={getResults} disabled={remainingTests<=0||loadingTests?true:false}>Get Results</Button>}
        </div>
      </div>


      <style jsx>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Prompt:wght@700&display=swap');

        .page{
            font-family:'Poppins'
        }
      `}
      </style>
    </Layout>
  )
}

export default Individual;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}
