'use client'
import { cn } from '@/lib/utils'
import { Home, Plus, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import ProModal from './ProModal'
import { useProModal } from '@/hooks/use-pro-model'
interface SideProps{
    isPro:boolean
}
export default function Sidebar({isPro}:SideProps) {
    const pathname = usePathname();
    const router = useRouter();
    const proModal =useProModal();
    const routes =[
        {
            icon:Home,
            href:"/",
            label:"Home",
            pro:false,
         

        },
        {
            icon:Plus,
            href:"/companion/new",
            label:"Create",
            pro:true

        },
        {
            icon:Settings,
            href:"/settings",
            label:"Settings",
            pro:false

        }
    ];
    const onNavigate =(url:string, pro:boolean)=>{
        if(pro && !isPro)
            return proModal.onOpen();
        return router.push(url)
    }
  return (
    <div style={{
     height:'90vh',
  
      boxSizing: 'border-box', 

    }} className='space-y-4 flex flex-col h-full  text-primary bg-secondary'>
<div className='p-3 flex-1 justify-center'>

{
    routes.map((route)=>(
<div onClick={()=>onNavigate(route.href, route.pro)} key={route.href} className={cn('space-y-2 text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg  transition', pathname==route.href && "mb-1 bg-primary/10 text-primary")}>
<div className='flex flex-col gap-y-2 items-center'>
<route.icon className='h-5 w-5'/>
{route.label}
</div>
</div>
    ))
}
</div>
    </div>
  )
}
