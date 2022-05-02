import { getSession } from "next-auth/react";
import Layout from "../components/Layout"

const About = ({session}) => {
    return <Layout session={session}>
        About
    </Layout>
}

export default About;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: { session }
    }
}

