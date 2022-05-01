import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from "next-auth/react"

const Header = () => {
  const router = useRouter()
  const isActive = (pathname) => router.pathname === pathname
  const { data: session } = useSession()
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
        <Link href="/hospital/affiliate">
          <a data-active={isActive('/hospital')} className={isActive('/hospital/affiliate')?'text-cyan-600':''}>Affiliate Hospital</a>
        </Link>
        <Link href="/contact">
          <a data-active={isActive('/contact')} className={isActive('/contact')?'text-cyan-600':''}>Contact Us</a>
        </Link>
        <Link href="/about">
          <a data-active={isActive('/about')} className={isActive('/about')?'text-cyan-600':''}>About Us</a>
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
        <Link href="/contact">
          <a data-active={isActive('/contact')} className={isActive('/contact')?'text-cyan-600':''}>Contact Us</a>
        </Link>
        <Link href="/about">
          <a data-active={isActive('/about')} className={isActive('/about')?'text-cyan-600':''}>About Us</a>
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
export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}
export default Header
