import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LayoutNoBg from "../../components/LayoutNoBg";
import axios from "axios";
const Manage = ({session}) =>{
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(async ()=>{
      await axios.post('/api/test/allForHospital',
            JSON.stringify({
                email:session.user.email,
                
            }),{
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        }).then(function(response){
          setPatients(response.data);
          setLoading(false);
        });
    },[])
    return <LayoutNoBg session={session}>
        <div className="justify-center">
          {loading?<CircularProgress />:<Table>
            <TableHead>
              <TableCell>Patient Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Test Result</TableCell>
              <TableCell>Saverity</TableCell>
              <TableCell>Share Result</TableCell>
            </TableHead>
            <TableBody>
              {
                patients.map(patient=><TableRow>
                  <TableCell>{patient.patientName}</TableCell>
                  <TableCell>{new Date(patient.patientDOB).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell>{patient.result}</TableCell>
                  <TableCell>{patient.severity}</TableCell>
                  <TableCell><a href={'https://detectcovid.tech/hospital/result/'+patient.id} class='text-blue-500' target='_blank'>Link</a></TableCell>
                </TableRow>)
              }
            </TableBody>
          </Table>}
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


export default Manage;

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
      props: { session }
    }
  }