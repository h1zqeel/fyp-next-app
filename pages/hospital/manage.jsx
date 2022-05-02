import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";

const Manage = ({session}) =>{
    return <Layout session={session}>
        Manage
    </Layout>
}


export default Manage;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: { session }
    }
  }