import Link from 'next/link'
import { useRouter } from 'next/router'
import {signOut} from 'next-auth/react';
import { useSpring, animated } from 'react-spring'

const Header = ({session}) => {
  const router = useRouter()
  const slideFromTop = useSpring({ to: { opacity: 1, transform: 'translateY(0px)' }, from: { opacity: 0, transform: 'translateY(-250px)' } })

  const isActive = (pathname) => router.pathname === pathname

  if(session) 
  return(
    <nav>
      <div className="left">
        <Link href="/">
          <a  data-active={isActive('/')}>
           Hey, <b>{session.user.name}</b>
          </a>
        </Link>
      </div>
      <div className="right">
        <Link href="/drafts">
          <a data-active={isActive('/hospital')}>Affiliate Hospital</a>
        </Link>
        <Link href="/signup">
          <a data-active={isActive('/contact')}>Contact Us</a>
        </Link>
        <Link href="/create">
          <a data-active={isActive('/about')}>About Us</a>
        </Link>
        <Link href="/">
          <a data-active={isActive('/')} onClick={signOut}>Sign Out</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        .bold {
          font-weight: bold;
          font-size:20px;
        }


        .left a[data-active='true'] {
          color: gray;
        }

        .right {
          margin-left: auto;
        }

        .right a {
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
      `}</style>
    </nav>
  )

  return(
    <nav>
      <div className="right">
        <Link href="/signup">
          <a data-active={isActive('/contact')}>Contact Us</a>
        </Link>
        <Link href="/create">
          <a data-active={isActive('/about')}>About Us</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          // background-color: #21325E;
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: gray;
        }

        .right {
          margin-left: auto;
        }

        .right a {
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
      `}</style>
    </nav>
  )
}

export default Header
