import { getSession } from "next-auth/react";
import Layout from "../components/Layout"

const Contact = ({session}) => {
    return <Layout session={session}>
        <p className="text-lg">Email Us @</p>
        <p>hizqeeljaved2013@gmail.com</p>
        <p>ba79724@gmail.com</p>
        <p className="text-lg mt-5">Call Us @</p>
        <p>03409140288</p>
        <p>03344026929</p>

        <style jsx>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Prompt:wght@700&display=swap');

        *{
            font-family:'Poppins'
        }
      `}
      </style>
    </Layout>
}

export default Contact;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: { session }
    }
}
