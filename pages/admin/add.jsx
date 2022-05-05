import { Button, Snackbar, TextField } from "@mui/material"
import axios from "axios"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import LayoutNoBg from "../../components/LayoutNoBg"
import { validateEmail } from "../../helpers"

const Add = ({session}) => {
    const [email, setEmail] = useState('');
    const [open ,setOpen] = useState(false);
    const [error ,setError] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [access, setAccess] = useState(false);
    useEffect(()=>{
        axios.post('/api/isHeAdmin',{email:session.user.email
        },{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        }).then(res=>{
            setAccess(res.data.admin);
            getAdmins();
        });
    },[])
    const getAdmins = () => {
        axios.get('/api/admin/get').then(res=>{
            setAdmins(res.data);
        })
    }
    const handleAdd = () => {
       if(!validateEmail(email)){
           setError(true);
           return;
       }

        axios.post('/api/admin/add',{
            email:email
        },{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }}).then(res=>{
            setOpen(true);
            setEmail('');
            getAdmins();
        }).catch(err=>{
            setError(true);
        })
    }
    if(!access)
        return <Layout>You Dont Have Access to This Page</Layout>
    return <LayoutNoBg session={session} admin={true}>
        <div className="flex flex-col  justify-center items-center">
        <div>List of Admins</div>
        <ul className="list-decimal mb-10">
            {admins.map(admin=>{
               return <li >{admin.email}</li>
            })}
        </ul>
        <TextField label="Email" variant="standard" type={'email'}  value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Button variant="text" onClick={handleAdd}> Add</Button>
        </div>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={()=>setOpen(false)}
        message="Admin Added"
      />
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={()=>setError(true)}
        message="An Error Occured: check email, duplicates not allowed"
      />
    </LayoutNoBg>
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
   
    // console.log(res);
    return {
      props: { session }
    }
  }

export default Add;
