import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, getSession, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { slide as Menu } from 'react-burger-menu'
import { height } from '@mui/system'

const Header = ({session,admin}) => {
  const router = useRouter()
  const [approvedHospital,setApprovedHospital] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

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
      <div className="right web">
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
          <a data-active={isActive('/hospital')} className={isActive('/hospital/affiliate')||isActive('/hospital/manage')?'text-cyan-600':''}>{'Hospital'}</a>
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
      <div className="right mobile hidden ">
      <Menu isOpen={showBurgerMenu} right={true} styles={styles}>
        
        <Link href="/">
          <a data-active={isActive('/')} className={isActive('/')?'text-cyan-600 link':'link'}>Home</a>
        </Link>
        <br></br>
        {admin?<><Link href={"/admin/add"}>
          <a className={isActive('/admin/add')?'text-cyan-600 link':'link'}>Add Admin</a>
        </Link><br></br></>:''}
        
        {admin?<><Link href={"/admin"}>
          <a className={isActive('/admin')?'text-cyan-600 link':'link'}>Requests</a>
        </Link><br></br></>:''}
        
        <Link href={!approvedHospital?"/hospital/affiliate":"/hospital/manage"}>
          <a data-active={isActive('/hospital')} className={isActive('/hospital/affiliate')||isActive('/hospital/manage')?'text-cyan-600 link':'link'}>{'Hospital'}</a>
        </Link>
        <br></br>
        <Link href="/contact">
          <a data-active={isActive('/contact')} className={isActive('/contact')?'text-cyan-600 link':'link'}>Contact Us</a>
        </Link>
        <br></br>
        <Link href="/about">
          <a data-active={isActive('/about')} className={isActive('/about')?'text-cyan-600 link':'link'}>About Us</a>
        </Link>
        <br></br>
        <Link href="/">
          <a data-active={isActive('/')} onClick={signOut}>Sign Out</a>
        </Link>
        <br></br>
        
       
        {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
      </Menu>
      </div>
      <style jsx>{`

        @media only screen and (max-width: 600px){
          .web{
            display:none;
          }
          .mobile{
            display:block;
          }
        }
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
var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '30px'
  },
  bmBurgerBars: {
    background: '#373a47',
    height:'2px',
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top:'0px',
    right:'0px',
  },
  bmMenu: {
    background: '#ecf0f1',
    padding: '1.5em 0em 0',
    fontSize: '1.5em'
  },
  bmMorphShape: {
    fill: '#ecf0f1'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '1.5em'
  },
  bmItem: {
    fontSize:'50px',
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

export default Header

