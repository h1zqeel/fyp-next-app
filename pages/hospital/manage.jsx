import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import LayoutNoBg from "../../components/LayoutNoBg";

const Manage = ({session}) =>{
    const [patients, setPatients] = useState([]);
    return <LayoutNoBg session={session}>
        <div className="justify-center">
          <Table>
            <TableHead>
              <TableCell>Patient Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>X-Ray/CT-Scan</TableCell>
              <TableCell>Test Result</TableCell>
              <TableCell>Saverity</TableCell>
              <TableCell>Share Result</TableCell>
            </TableHead>
            <TableBody>
              {
                patients.map(patient=><TableRow>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>{patient.scan}</TableCell>
                  <TableCell>{patient.testResult}</TableCell>
                  <TableCell>{patient.severity}</TableCell>
                  <TableCell>{'Share'}</TableCell>
                </TableRow>)
              }
            </TableBody>
          </Table>
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