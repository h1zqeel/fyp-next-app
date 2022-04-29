import { useSession, signIn, signOut } from "next-auth/react"
import Header from "../components/Header";
import Layout from "../components/Layout";


export default function Component() {
  const { data: session } = useSession()
  if (session) {
    console.log(session.user);
    return (
      <>
        <Layout signIn = {true} >
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        </Layout>
      

      <style jsx>
        {
          `
          
          .btn{
            background-color: lightblue;
            border-radius: 25px;
            font-size: 20px;
            outline: none;
            border: none;
            cursor: pointer;
          }

          .btn:hover{
            padding: 8px 20px;
            transition: all .3s  ease-out;
            background: black;
            color: white;
            transition: 250ms;
          }
          }
          `
        }
      </style>
      </>

    )
  }

  return (
    <>
    <Layout  >
    <button className="btn" onClick={() => signIn('google')}>Sign in</button>
    </Layout>
      

      <style jsx>
        {
          `
          
          .btn{
            background-color: lightblue;
            border-radius: 25px;
            font-size: 20px;
            outline: none;
            border: none;
            cursor: pointer;
          }

          .btn:hover{
            padding: 8px 20px;
            transition: all .3s  ease-out;
            background: black;
            color: white;
            transition: 250ms;
          }
          }
          `
        }
      </style>
      
    </>
  )
}