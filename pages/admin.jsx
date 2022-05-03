import { faCancel, faCheck, faCheckSquare, faCoffee, faDeleteLeft, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import LayoutNoBg from "../components/LayoutNoBg";

const Admin = ({session}) => {
  
const [access, setAccess] = useState(false);
const [requests, setRequests] = useState([]);
useEffect(async ()=>{
  axios.post('/api/is-he-admin',{email:session.user.email
  },{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  }).then(res=>{
    setAccess(res.data.admin);
    axios.post('/api/get-all-requests')
    .then(requests=>{
      setRequests(requests.data);
      // console.log(requests, 1);
    })
  });
},[])
if(!access)
  return <Layout>
    it seems like you dont have access to this page
  </Layout>
    return <LayoutNoBg session={session} admin={true}>
      <div className="mx-10">

      
        <h1 className="heading text-2xl">Hospitals: Requests & Approved</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hospital Name</TableCell>
              <TableCell>Hospital Email</TableCell>
              {/* <TableCell>Plan</TableCell> */}
              {/* <TableCell>Phone</TableCell> */}
              {/* <TableCell>Hospital Phone</TableCell> */}
              {/* <TableCell>Reason</TableCell> */}
              <TableCell>Approved</TableCell>
              {/* <TableCell>Payment</TableCell> */}
              <TableCell>Actions</TableCell>
              <TableCell>Status</TableCell>
            </TableHead>
            <TableBody>
              {requests.map((item)=>(<TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.hospitalName}</TableCell>
                <TableCell>{item.hospitalEmail}</TableCell>
                {/* <TableCell>{item.plan}</TableCell> */}
                {/* <TableCell>{item.phone}</TableCell> */}
                {/* <TableCell>{item.hospitalPhone}</TableCell> */}
                {/* <TableCell>{item.why}</TableCell> */}
                <TableCell>{item.approved?'Yes':'No'}</TableCell>
                {/* <TableCell>{item.paid?'Yes':'No'}</TableCell> */}
                
                <TableCell>
                  <div className="flex flex-row">
                  <Tooltip title="View Details">
                    <IconButton>
                      <FontAwesomeIcon className="text-base" icon={faEye} />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Delete">
                    <IconButton>
                      <FontAwesomeIcon className="text-base" icon={faTrash} />
                    </IconButton>
                  </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                <Tooltip title="Approve">
                    <IconButton>
                      <FontAwesomeIcon className="text-base" icon={faCheckSquare} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject">
                    <IconButton>
                      <FontAwesomeIcon className="text-base" icon={faCancel} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>))}
            </TableBody>
          </Table>
          
        </TableContainer>
        </div>
        <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Prompt:wght@700&display=swap');
        .heading {
            font-family: 'Prompt'
        }
        form, .list-disc, * {
            font-family: 'Poppins'
        }
      `}</style>
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

export default Admin;

