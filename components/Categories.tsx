"use client"
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import React from 'react'

interface CategoriesProps {
    data: Category[];
}
export default function Categories({data}:CategoriesProps) {
    const router = useRouter();
    const SearchParams = useSearchParams();
    const categoryId = SearchParams.get("categoryId");
    const onClick =(id:string|undefined)=>{
     const query ={
        categoryId:id
     };
     const url = queryString.stringifyUrl({
        url:window.location.href,
        query,

     },{skipEmptyString:true, skipNull:true})
     router.push(url);
    }
  return (
    <div className='w-full overflow-x-auto space-x-2 flex p-1'>

      {
        data.map((item)=>(
            <button onClick={()=>{
                onClick(item.id.toString())
            }} key={item.id} className={cn(`
            flex
            items-center
            text-center
            text-xs
            md:text-sm
            px-2
            md:px-4
            py-2
            md:py-3
            rounded-md
            bg-primary/10
            hover:opacity-75

            ` ,item.id.toString()===categoryId? "bg-primary/25": "bg-primary/10")}>
             {item.name}
            </button>
        ))
      }
    </div>
  )
}
