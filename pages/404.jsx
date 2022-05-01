import Link from "next/link"
export default function Custom404() {
    return <div className="flex items-center justify-center h-screen text-2xl">404 - Are You Lost ? <Link href='/'><span className="text-slate-400 underline cursor-pointer ml-1">Go Back</span></Link></div>
  }