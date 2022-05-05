import { Button, CircularProgress, Snackbar, TextField } from "@mui/material"
import axios from "axios"
import { getSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import LayoutNoBg from "../../components/LayoutNoBg"
import { validateEmail } from "../../helpers"

const Add = ({session}) => {
    const [email, setEmail] = useState('');
    const [open ,setOpen] = useState(false);
    const [error ,setError] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [loadingAdmins, setLoadingAdmins] = useState(true);
    const [access, setAccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [addingAdmin, setAddingAdmin] = useState(false);
    useEffect(()=>{
        axios.post('/api/isHeAdmin',{email:session.user.email
        },{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        }).then(res=>{
            setLoading(false);
            setAccess(res.data.admin);
            getAdmins();
        });
    },[])
    const getAdmins = () => {
        axios.get('/api/admin/get').then(res=>{
            setAdmins(res.data);
            setLoadingAdmins(false);
        })
    }
    const handleAdd = () => {
      setAddingAdmin(true);
       if(!validateEmail(email)){
           setError(true);
           setAddingAdmin(false);
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
            setAdmins([...admins, {email}]);
            setAddingAdmin(false);
        }).catch(err=>{
            setError(true);
            setAddingAdmin(false);

        })
    }
    if(loading){
      return <Layout session={session}>
        
        <CircularProgress />
      </Layout>
    }
    if(!access)
      return <div className="flex flex-col justify-center h-screen items-center">
        it seems like you dont have access to this page
        <Link href="/" ><a>Go Back</a></Link>
      </div>
    return <LayoutNoBg session={session} admin={true}>
        <div className="flex flex-col  justify-center items-center">
        <div>List of Admins</div>
        {loadingAdmins?<CircularProgress size='1rem' />:<ul className="list-decimal mb-10">
            {admins.map(admin=>{
               return <li >{admin.email}</li>
            })}
        </ul>}
        <TextField label="Email" variant="standard" type={'email'}  value={email} onChange={(e)=>setEmail(e.target.value)} />
        {addingAdmin?<CircularProgress size="2rem" />:<Button variant="text" onClick={handleAdd}> Add</Button>}
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
