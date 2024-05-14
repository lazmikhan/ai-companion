
import prismadb from '@/lib/prismadb'
import { RedirectToSignIn } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'

import { redirect, useSearchParams } from 'next/navigation'
import React from 'react'
import ChatClient from './components/ChatClient'
interface ChatIdProps{
  params:{
    chatId:string
  }
}
export default async function ChatId({params}:ChatIdProps) {
    
  const userID = auth();

  if(!userID.userId)
    {
     
      return  <RedirectToSignIn />
    }
    const companion = await prismadb.companion.findUnique(
   {
    where:{
      id: params.chatId
    },
    include:{
      messages:{
        orderBy:{
          createdAt: "asc",

        },
        where:{
          userId:userID.userId
        },
       
      },
      _count:{
        select:{
          messages:true
        }
      }
    }
   }
 
    )
    if(!companion)
      {
        return redirect("/");
      }
  return (
 <ChatClient companion={companion}/>   
  )
}
