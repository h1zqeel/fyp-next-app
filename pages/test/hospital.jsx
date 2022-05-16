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


const Hospital = ({session}) => {
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState(Date(0))
    const [remainingTests, setRemainingTests] = useState(0);
    const [loadingTests, setLoadingTests] = useState(0);
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
       setRemainingTests(parseInt(response.data.remaining));
       setLoadingTests(0);
     })
    },[])
  return (
    <Layout session={session}>
      <div className="page">
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
            Upload CT-Scan
            <input
            type="file"
            hidden
            />
            </Button>
        </div>
        <div className="mt-5">
            <Button variant="outlined" disabled={loadingTests||remainingTests<1?true:false}>Get Results</Button>
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

export default Hospital;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}
