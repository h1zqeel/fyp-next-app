import { getSession } from "next-auth/react";
import Layout from "../components/Layout"

const Contact = ({session}) => {
    return <Layout session={session}>
        Contact
    </Layout>
}

export default Contact;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: { session }
    }
}
