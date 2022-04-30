import Link from 'next/link'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'

const Intro = ({session}) => {

  return (
    <div className='outer'>
        <div className='inner lg:mt-44 mt-20 lg:ml-40 '>
            <h1>
                <span className='lg:text-7xl text-5xl font-bold'>Detection Agent</span><br />
                <span className='mt-5 lg:text-4xl text-2xl font-bold text-red-400' >for Covid 19</span>
            </h1>
            <div className="mt-12">
                <Link href={session?'/test':'/login'}>
                    <span className="btn px-10 py-3 rounded-full text-white cursor-pointer"> {session?'Take Test':'Get Started'}</span>
                </Link>
            </div>
            <div className="mt-12">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.<br></br> Minima quam repellat laborum aperiam natus repudiandae!
                </p>
            </div>
        </div>
      <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Prompt:wght@700&display=swap');
        h1{
            font-family: 'Prompt', sans-serif;
        }
        .btn-color{
        }
        .btn {
            transition:0.1s;
            background-color:#82DFED;
        }
        .btn:hover{
            background-color:#66b1bd;

        }
        p{
            font-size:18px;
            font-family:'Poppins'
        }
        button {
            float:right
        }
      `}</style>
    </div>
  )
}

export default Intro