import Layout from "../../components/Layout"
import { Button, TextField } from "@mui/material"
import { getSession } from "next-auth/react"
import CustomInput from "../../components/forms/customInput"
import Plan from "../../components/forms/plan"
import Plans from "../../components/forms/plans"
import { useSpring, animated } from 'react-spring'

const Affiliate =  ({session}) => {
    const slideFromRight = useSpring({ to: { opacity: 1, transform: 'translateX(0px)' }, from: { opacity: 0, transform: 'translateX(250px)' } })

  return (
    <Layout>
      <animated.div className="page" style={slideFromRight}> 
          <p className="text-3xl heading">Please Fill Out the Form Below</p>
       <form className="mt-5 " action="">
            <CustomInput name={'Name'} def={session.user.name} disabled={true} />
            <CustomInput name={'Hospital Name'} />
            <CustomInput name={'Your Email'} def={session.user.email} disabled={true} />
            <CustomInput name={'Hospital Email'} />
            <div className="mt-4">
                Select Plan
                <Plans />
            </div>
            <div className="w-1/4 mt-2">
            <Button className="float-right" variant="outlined">Submit Request</Button>

            </div>

       </form>
      </animated.div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Prompt:wght@700&display=swap');
        .heading {
            font-family: 'Prompt'
        }
        form {
            font-family: 'Poppins'
        }
      `}</style>
    </Layout>
  )
}
export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return {
      props: { session }
    }
  }

export default Affiliate
