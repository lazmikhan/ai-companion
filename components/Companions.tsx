import { Companion } from '@prisma/client'
import Image from 'next/image';
import React from 'react'

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
    <div>
      Companions
    </div>
  )
}
