import React, { ChangeEvent, FormEvent } from 'react'
import {ChatRequestOptions} from "ai";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizonal } from 'lucide-react';
interface ChatFormProps{
    isLoading: boolean;
    input:string,
    handleInputChange:(e:ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLTextAreaElement>)=>void;
    onSubmit:(e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions|undefined)=>void;
}
export default function ChatForm({
    input, handleInputChange,isLoading,onSubmit
}:ChatFormProps) {
  return (
 <form className='border-t border-primary/10 py-4 flex items-center gap-x-2' onSubmit={onSubmit} action="
 ">
<Input disabled={isLoading}
value={input}
onChange={handleInputChange}
placeholder='Type a message'
className='rounded-lg bg-primary/10'
/>
<Button disabled={isLoading} variant="ghost" ><SendHorizonal/></Button>
 </form>
  )
}
