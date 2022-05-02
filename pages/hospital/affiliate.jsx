import Layout from "../../components/Layout"
import { Button, TextField } from "@mui/material"
import { getSession } from "next-auth/react"
import CustomInput from "../../components/forms/customInput"
import Plan from "../../components/forms/plan"
import Plans from "../../components/forms/plans"
import { useSpring, animated, useTransition } from 'react-spring'
import { useEffect, useState } from "react"
import FileUpload from "react-material-file-upload"
import Link from "next/link"
const axios = require('axios').default;

const Affiliate =  ({session}) => {

const [next, setNext] = useState(false);
// const slideFromLeftHide = useTransition(next,{
//     from: {opacity:1, transform: 'translateX(0px)'},
//     to: {opacity:0, transform: 'translateX(-250px)'}
// });
// const [processing, setProcesing] = useState(false);

const slideFromLeft= useSpring({ to: { opacity: 1, transform: 'translateX(0px)' }, from: { opacity: 0, transform: 'translateX(-250px)' } });

const slideFromRight = useSpring({ to: { opacity: 1, transform: 'translateX(0px)', display: !next ? 'block': 'none' }, from: { opacity: 0, transform: 'translateX(250px)' } });
// const slideFromLeftHide = useSpring({ to: { opacity:  0, transform: 'translateX(-250px)' }, from: { opacity: 1, transform: 'translateX(0px)' } });
const slideNextPage = useSpring({
    to:{
        opacity: next ? 1 : 0,
        transform: next ? 'translateX(0px)': 'translateX(50px)'
    },
    from:{
        opacity: 0,
        transform: 'translateX(50px)'
    }
});
const [email, setEmail] = useState(session.user.email);
const [name, setName] = useState(session.user.name);
const [hospitalName, setHospitalName] = useState('');
const [hospitalEmail, setHospitalEmail] = useState('');
const [plan, setPlan] = useState(null);
const [phone, setPhone] = useState('');
const [hospitalPhone, setHospitalPhone] = useState('');
const [why, setWhy] = useState('');
const [processing, setProcessing] = useState(false);
const [error, setError] = useState(false);
const handleNext = () => {
    setError(false);
    if(hospitalName.length !== 0 && plan != null)
        setNext(!next);
    else
        setError(true);
}
useEffect(async ()=>{
    axios.post('/api/hospital/requestProcessing',
    JSON.stringify({
     email:session.user.email
     }),{
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
     })
     .then(function (response) {
       setProcessing(response.data.processing);
     })
     .catch(function (error) {
       console.log(error);
     });
    
},[])
const handleSubmit = () => {
    if(phone.length && hospitalPhone.length && why.length){
        axios.post('/api/hospital/createRequest',
         JSON.stringify({
           name,
           email,
           hospitalName,
           hospitalEmail,
           plan,
           phone,
           hospitalPhone,
           why

          }),{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    
    }
}

  return (
    <Layout>

<div className={processing?'hidden':''}>
      <animated.div className={!next?"page":'next page'} style={slideFromRight} >
          <p className="text-3xl heading">Please Fill Out the Form Below</p>
       <form className="mt-5 " action="">
            <CustomInput name={'Name'} def={session.user.name} disabled={true} state={name} setState={setName}/>
            <CustomInput name={'Hospital Name*'} state={hospitalName} setState={setHospitalName} />
            <CustomInput name={'Your Email'} def={session.user.email} disabled={true} state={email} setState={setEmail} />
            <CustomInput name={'Hospital Email'} state={hospitalEmail} setState={setHospitalEmail}/>
            <div className="mt-4">
                Select Plan*
                <Plans set={setPlan} />
            </div>
            <div className="w-1/4 mt-5">
                <Button variant="outlined" className={null?"border-red-800 text-red-800":''} onClick={handleNext}>Next</Button>
            </div>
       </form>
      </animated.div>
      <animated.div style={slideNextPage} className={next?'next':'next hidden'}>
      <p className="text-2xl heading">Continued...</p>
      <CustomInput name={'Your Phone*'} state={phone} setState={setPhone}/>
      <CustomInput name={'Hospital Phone*'} state={hospitalPhone} setState={setHospitalPhone}/>
      <CustomInput name={'Why You Want Our Service*'} multiline={true} state={why} setState={setWhy}/>

         
         <div className="w-1/4 mt-5" >
                <Button variant="outlined"  onClick={handleSubmit}>Submit</Button>
        </div>
         
      

      </animated.div>
      </div>
      <animated.div style={slideFromLeft} className={processing?'':'hidden'}>
          <div className="text-md">
          <p className="text-3xl heading mb-5">Your Application is being Processed</p>

        Thank You for Choosing our service to be a part of Your <b>Hospital</b> <br/>
        Your Application is being processed, it can take upto two business days <br/> 
        for the processing to complete.<br></br>
        If you have any question regarding your application or any question<br/> regarding our Service
        feel free to contact us at any time in the Contact Section.<br>
        </br>
        Thank You,<br></br>
        <b>Dev Team</b>
        </div>
        <Link href="/">
          <a className="text-slate-500 text-sm mt-10">
            Go Back
          </a>
        </Link>

       
        {/* <a href="/contact">Contact Us</a><br></br>
        <a href="/test">Take a Test</a><br></br> */}
      </animated.div>
      <div className="mt-5 text-red-600 text-sm">{error?"* Fields Can't be left Blank":''}</div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Prompt:wght@700&display=swap');
        .heading {
            font-family: 'Prompt'
        }
        form, .list-disc, * {
            font-family: 'Poppins'
        }
      `}</style>
    </Layout>
  )
}
export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return {
      props: { session, processing:false }
    }
  }

export default Affiliate
