import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, getSession, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
import axios from 'axios'

const Header = ({session,admin}) => {
  const router = useRouter()
  const [approvedHospital,setApprovedHospital] = useState(false);
  const isActive = (pathname) => router.pathname === pathname
  // const { data: session } = useSession()

  useEffect(()=>{
    if(session)
      axios.post('/api/hospital/isApproved',
      JSON.stringify({
      email:session.user.email,
      }),{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      })
      .then(function (response) {
        setApprovedHospital(response.data.approved);
      })
      .catch(function (error) {
        console.log(error);
      });
    },[]);
  
  if(session) 
  return(
    <nav>
      <div className="left">
        <Link href="/">
          <a  data-active={isActive('/')}>
           Hey, <b>{!admin?session.user.name:'Welcome to Admin Panel ' +session.user.name}</b>
          </a>
        </Link>
      </div>
      <div className="right">
        <Link href="/">
          <a data-active={isActive('/')} className={isActive('/')?'text-cyan-600':''}>Home</a>
        </Link>
        {admin?<Link href={"/admin/add"}>
          <a className={isActive('/admin/add')?'text-cyan-600':''}>Add Admin</a>
        </Link>:''}
        {admin?<Link href={"/admin"}>
          <a className={isActive('/admin')?'text-cyan-600':''}>Requests</a>
        </Link>:''}
        <Link href={!approvedHospital?"/hospital/affiliate":"/hospital/manage"}>
          <a data-active={isActive('/hospital')} className={isActive('/hospital/affiliate')||isActive('/hospital/manage')?'text-cyan-600':''}>{!approvedHospital?'Affiliate Hospital':'Manage Hospital'}</a>
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
export default Header
