import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Intro = ({session}) => {
    const [isHospital, setIsHospital] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(async ()=>{
    if(session){
    setLoading(true);
    await axios.post('/api/hospital/isApproved',
    JSON.stringify({
     email:session.user.email
     }),{
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
     })
     .then(function (response) {
       setIsHospital(response.data.approved)
       setLoading(false);
       console.log(response);
     })
    }
    },[])
  return (
    <div className='outer'>
        <div className='inner'>
            <h1>
                <span className='lg:text-7xl text-4xl font-bold'>Detection Agent</span><br />
                <span className='mt-5 lg:text-4xl text-2xl font-bold text-red-400' >for Covid 19</span>
            </h1>
            <div className="mt-12">
                {!loading?<>{session?<Link href={isHospital?'/test/hospital':'/test/individual'}>
                    <span className="btn px-10 py-3 rounded-full text-white cursor-pointer"> {session?'Take Test':'Get Started'}</span>
                </Link>:<Link href={'/login'}>
                    <span className="btn px-10 py-3 rounded-full text-white cursor-pointer"> {session?'Take Test':'Get Started'}</span>
                </Link>}</>:<CircularProgress size={'1.5rem'} />}
            </div>
            <div className="mt-12">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.<br></br> <div className='lg:mt-0 mt-3'> Minima quam repellat laborum aperiam natus repudiandae!</div>
                </p>
            </div>
        </div>
      <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Prompt:wght@700&display=swap');
        h1{
            font-family: 'Prompt', sans-serif;
        }
        .btn-color{
        }
        .btn {
            transition:0.1s;
            background-color:#82DFED;
        }
        .btn:hover{
            background-color:#66b1bd;

        }
        p{
            font-size:18px;
            font-family:'Poppins'
        }
        button {
            float:right
        }
      `}</style>
    </div>
  )
}

export default Intro