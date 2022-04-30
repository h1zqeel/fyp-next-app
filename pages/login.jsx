import Layout from '../components/Layout'
import { FacebookLoginButton, GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { signIn } from 'next-auth/react';
import { useSpring, animated } from 'react-spring'

const Login = props => {
  const slideFromRight = useSpring({ to: { opacity: 1, transform: 'translateX(0px)' }, from: { opacity: 0, transform: 'translateX(250px)' } })

  return (
    <Layout>
      <animated.div style={slideFromRight} className='w-1/4 lg:mt-44 mt-20 lg:ml-40 '>
        <p className='lg:text-4xl text-2xl font-bold text-red-400 mb-5'>Please Login Below</p>
            <span>
              <FacebookLoginButton onClick={()=>signIn('facebook',{ callbackUrl: `${window.location.origin}/`})} />
            </span>
            <div className='my-3'>
              <GoogleLoginButton onClick={()=>signIn('google',{ callbackUrl: `${window.location.origin}/`})} />
            </div>
            <span>
              <GithubLoginButton onClick={()=>signIn('github',{ callbackUrl: `${window.location.origin}/`})} />
            </span>
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
