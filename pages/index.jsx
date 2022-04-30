import { useSession, signIn, signOut } from "next-auth/react"
import Header from "../components/Header";
import Layout from "../components/Layout";
import Intro from "../components/homepage/Into";
import { useSpring, animated } from 'react-spring'

export default function Component() {
  const { data: session } = useSession()
  const slideFromLeft = useSpring({ to: { opacity: 1, transform: 'translateX(0px)' }, from: { opacity: 0, transform: 'translateX(-250px)' } })

  if (session) {
    return (
      <>
        <Layout session={session} >
          <animated.div style={slideFromLeft}>
            <Intro session={session}/>
          </animated.div>
        </Layout>

      <style jsx>
        {
          `
          `
        }
      </style>
      </>

    )
  }

  return (
    <>
    <Layout>
      <animated.div style={slideFromLeft}>
        <Intro session={session}/>
      </animated.div>
    </Layout>
    
      <style jsx>
        {
          `
          `
        }
      </style>
    </>
  )
}