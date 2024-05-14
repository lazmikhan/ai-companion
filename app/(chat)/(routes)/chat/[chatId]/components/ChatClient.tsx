"use client"
import ChatHeader from '@/components/ChatHeader'
import { Companion, Message } from '@prisma/client'
import React from 'react'
interface ChatClientProps{
    companion:Companion & {
        messages: Message[],
        _count:{
            messages:number
        }
    }
}
export default function ChatClient({companion}:ChatClientProps) {
  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
        <ChatHeader companion={companion}/>
      this is chat client
    </div>
  )
}
