"use client"
import { Companion, Message } from '@prisma/client'
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import BotAvatar from './BotAvatar';
import { useUser } from '@clerk/nextjs';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useToast } from './ui/use-toast';
import axios from 'axios';

interface ChatHeaderProps{
    companion: Companion & {
        messages: Message[];
        _count:{
            messages:number
        }
    }
};
export default function ChatHeader({companion}:ChatHeaderProps) {
    const router = useRouter();
    const {user}= useUser();
    const {toast} = useToast();
    const onDelete=async()=>{
        try{
await axios.delete(`/api/companion/${companion.id}`);
toast({
  
    description:"Success"
})
router.refresh();

        }catch(error)
        {
toast({
  
    description:"Something went wrong.",
    variant:"destructive"
})
        }
    }
  return (
    <div className='flex w-full justify-between items-center border-b border-primary/10 pb-4'>
     <div className='flex gap-x-2 items-center'>
  <Button onClick={()=>{
    router.back()
  }} size="icon" variant="ghost">
    <ChevronLeft className='w-8 h-8'/>
  </Button>

<BotAvatar companion={companion}/>
<div className='flex flex-col gap-y-1'>
<div className='flex items-center gap-x-2'>
<p className='text-lg font-bold '>{companion.name}</p>
<div className='ml-2 flex text-xs text-muted-foreground items-center gap-x-1'>
<MessagesSquare className='w-3 h-3'/>{companion._count.messages}
</div>
</div>
<p className='text-xs text-muted-foreground'>
    Created By {companion.username}
</p>
</div>

     </div>
{user?.id === companion.userId &&(
    <DropdownMenu>
       <DropdownMenuTrigger>
        <Button variant="secondary" size="icon">
            <MoreVertical/>
        </Button>
        </DropdownMenuTrigger> 
        <DropdownMenuContent align='end'>
<DropdownMenuItem className='cursor-pointer' onClick={()=>{
    router.push(`/companion/${companion.id}`)
}}>
<div className='flex border-b items-center bg-black p-1 pl-2 pr-12'>
<Edit  className='w-4 h-4 mr-2'/>
    Edit
</div>
</DropdownMenuItem>
<DropdownMenuItem className='cursor-pointer'  onClick={onDelete}>
<div className='flex items-center bg-black p-1 pl-2 pr-12'>
<Trash className='w-4 h-4 mr-2'/>
    Delete
</div>
</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)}
    </div>
  )
}
