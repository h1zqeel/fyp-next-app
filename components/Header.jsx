import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = (props) => {
  const router = useRouter()

  const isActive = (pathname) => router.pathname === pathname

  const {signIn} = props
  console.log(signIn,'RandomText')
  if(signIn) 
  return(
    <nav>
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            COVID-19
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
          <a data-active={isActive('/credits')}>Credits</a>
        </Link>
        <Link href="/create">
          <a data-active={isActive('/about')}>About Us</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          background-color: #21325E;
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        .bold {
          font-weight: bold;
          font-size:20px;
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

  return(
    <nav>
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            COVID-19
          </a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          background-color: #21325E;
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
