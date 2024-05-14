import { Companion } from '@prisma/client'
import Image from 'next/image';
import React from 'react'
import { Card, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';
import { MessagesSquare } from 'lucide-react';

interface CompanionsProps{
    data:( Companion & {
        _count :{
            messages:number
        }
    })[];
}
export default function Companions({data}:CompanionsProps) {
    if(data.length==0)
        {
            return(
             <div className='flex flex-col justify-center items-center'>
                   <div className='flex justify-center relative w-60 h-60'>
                    <Image fill className='grayscale' alt='Empty' src={"/brokenImg.png"}/>
               
                </div>
                <p className='text-sm text-muted-foreground'>No Companions Found.</p>
             </div>
            )
        }
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10'>
  {
    data.map((item)=>(
<Card className='bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0' key={item.id}>
<Link href={`/chat/${item.id}`}>
    <CardHeader className='flex justify-center items-center text-center text-muted-foreground'>
        <div className='relative w-32 h-32'>
            <Image alt='Companion' className='rounded-xl' fill src={item.src}/>
        </div>
        <p className='font-bold'>
            {item.name}
        </p>
        <p className='text-xs'>
            {item.description}
        </p>
    </CardHeader>
    <CardFooter className='flex justify-between text-muted-foreground text-xs'>
<p className='lowercase'>@{item.username}</p>
<div className='flex items-center'>
<MessagesSquare className='w-3 h- mr-1'/>
<p>{item._count.messages}</p>
</div>
    </CardFooter>
</Link>
</Card>
    ))
  }
    </div>
  )
}
