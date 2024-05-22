"use client"
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { Menu, Sparkles } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './theme-toggle'
import MobileSidebar from './mobile-sidebar'
import ProModal from './ProModal'
import { useProModal } from '@/hooks/use-pro-model'

const font = Poppins({
weight:'600',
subsets: ["latin"]
})
interface NavbarProps{
    isPro:boolean
}
export default function Navbar({isPro}:NavbarProps) {
    const proModal = useProModal();
  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-4 px-4 border-primary/10 bg-secondary'>
        <div className='flex items-center'>
<MobileSidebar/>
<Link href="/">
    <h1 className={
        cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)
    }>
companion.ai
    </h1>
</Link>
        </div>
        <div className='flex items-center gap-x-3'>
            <ModeToggle/>
      {!isPro  && 
       <Button onClick={proModal.onOpen

} variant="premium" size="sm">Upgrade
    <Sparkles className='h-4 w-4 fill-white text-white'/>
</Button>}
      
 <UserButton afterSignOutUrl='/' />
        </div>
   
    </div>
  )
}
