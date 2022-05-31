import { getSession } from "next-auth/react";
import Layout from "../components/Layout"

const About = ({session}) => {
    return <Layout session={session}>
        <div className="w-5/12">
    Covid-19 is continuously spreading around the world with more than 240 million cases around the world, just in Pakistan more than 1 million covid cases has been detected. Keeping this information in mind we need to figure out better ways to test people for covid-19, to be able to diagnose them for covid.Huge amount of data is available for covid patients such as their Chest CT-Scans,these chest CT-Scans could be used to develop a Machine Learning based model that can predict if a patient has Covid or not. We have created a mobile app that will allow the user to check their covid after uploading their CT scan and through this we can help everyone they wont have to stay in hospital just to get checked for that reason they will be more safe.
    </div>
    <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Prompt:wght@700&display=swap');
        .heading {
            font-family: 'Prompt'
        }
        form, .list-disc, * {
            font-family: 'Poppins'
        }
      `}</style>
    </Layout>
}

export default About;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: { session }
    }
}

