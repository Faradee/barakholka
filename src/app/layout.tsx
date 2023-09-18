import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'todo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}  bg-slate-100 container mx-auto py-5 `}>
        <nav className="flex mx-auto justify-center items-center py-4">
          <div className='flex justify-start'>
          <Image className='pr-4'  src="/rea-logo.png" width="0" height="0" sizes="100vw"
           alt="Logo" style={{ width: 'auto', height: '5vh' }}/>
          <Link href="/buy" className='nav-button'> Buy</Link>
          <Link href="/sell" className='nav-button'> Sell</Link>
          <Link href="/rent" className='nav-button'> Rent</Link>
          <Link href="/land" className='nav-button'> Land</Link>
          <Link href="/commercial" className='nav-button'> Commercial</Link>
          </div>
          <div className='flex ml-auto'>
          <Link href="/buy" className='nav-button'> Sign in</Link>
          <Link href="/sell" className='nav-button bg-red-600'> Login</Link>
          </div>
        </nav>
        {children}
        </body>
    </html>
  )
}
