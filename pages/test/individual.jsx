import Layout from "../../components/Layout"
import { useSession, signOut } from "next-auth/react"
import Router from 'next/router'
import { useEffect } from "react"


const Individual = props => {
    const { data: session } = useSession()

    useEffect(()=>{
        if(!session){
            return Router.push('/')
        }
    },[])
  return (
    <Layout>
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


export default Individual
