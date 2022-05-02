import Layout from "../../components/Layout"
import { useSession, signOut, getSession } from "next-auth/react"
import Router from 'next/router'
import { useEffect } from "react"


const Individual = ({session}) => {
    useEffect(()=>{
        if(!session){
            return Router.push('/')
        }
    },[])
  return (
    <Layout session={session}>
      <div className="page">
       <p>hospital</p>
      </div>
      <style jsx>
        {`

      `}
      </style>
    </Layout>
  )
}

export default Individual;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}
