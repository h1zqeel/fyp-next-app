import Layout from '../components/Layout'
import {useSession, signIn, signOut} from 'next-auth/react';

const Home = props => {
    const {data: session} = useSession();
    if (session) {
        return (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        );
    }
    return (
        <>
          Not signed in <br />
          <button onClick={() => signIn('google')}>Sign in</button>
        </>
    );
}


export default Home