import { getSession } from "next-auth/react";
import Layout from "../../../components/Layout";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { set } from "nprogress";
import axios from "axios";
import { CircularProgress } from "@mui/material";
const About = ({session}) => {
    const router = useRouter()
    const { id } = router.query
    const [name,setName] = useState('');
    const [dob, setDob] = useState('');
    const [result, setResult] = useState('');
    const [severity, setSeverity] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(async ()=>{
        await axios.post('/api/result/get',
            JSON.stringify({
                id:id,
                hospital: true,
            }),{
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(function (response) {
            setName(response.data.name);
            setDob(new Date(response.data.dob).toLocaleDateString('en-GB'));
            // let date = ;
            setResult(response.data.result);
            setSeverity(response.data.severity);
            setLoading(false);
     })
    }, []);
    return <Layout session={session}>
        <h1 className="text-xl mb-5">Test Result</h1>
        {loading?<CircularProgress />:<table>
            <tr>
                <th>
                    Name
                </th>
                <td>
                    {name}
                </td>
            </tr>
            <tr>
                <th>
                    DOB
                </th>
                <td>
                    {dob}
                </td>
            </tr>
            <tr>
                <th>
                    Result
                </th>
                <td>
                    {result}
                </td>
            </tr>
            <tr>
                <th>Severity</th>
                <td>
                    {severity}
                </td>
            </tr>
            
        </table>}

        <style jsx>
            {`
            td,th{
                text-align:left;
                border: 1px solid black;
                padding:10px;
            }
            
            `}

        </style>
    </Layout>
}

export default About;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: { session }
    }
}

