import Layout from '../components/Layout'
import { FacebookLoginButton, GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { signIn } from 'next-auth/react';
import { useSpring, animated } from 'react-spring'

const Login = props => {
  const slideFromRight = useSpring({ to: { opacity: 1, transform: 'translateX(0px)' }, from: { opacity: 0, transform: 'translateX(250px)' } })

  return (
    <Layout>
      <animated.div style={slideFromRight} className='lg:w-1/4'>
        <p className='2xl:text-4xl xl:text-3xl text-2xl font-bold text-red-400 mb-5'>Please Login Below</p>
            <div className='my-3'>
              <GoogleLoginButton onClick={()=>signIn('google',{ callbackUrl: `${window.location.origin}/`})} />
            </div>
      </animated.div>
      <style jsx>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Prompt:wght@700&display=swap');
      p{
        font-family:'Prompt'
      }
      `}</style>
    </Layout>
  )
}


export default Login
