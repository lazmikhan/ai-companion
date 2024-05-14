import prismadb from '@/lib/prismadb'
import React from 'react'
import CompanionForm from '@/app/(chat)/(routes)/companion/[companionId]/components/CompanionForm'
import { auth, currentUser } from '@clerk/nextjs/server'
import { RedirectToSignIn } from '@clerk/nextjs'
interface CompanionIdProps{
    params:{
        companionId:string
    }
}
export default async function CompanionId({params}:CompanionIdProps) {
//check subscription
const userId = await currentUser();

  if(!userId)
    {

      return  <RedirectToSignIn />
    }
   
const companion = await prismadb.companion.findUnique({
where:{
   
    id: params.companionId,
   userId: userId?.id
}
})
const categories = await prismadb.category.findMany();


  return (
  <CompanionForm initialData={companion} categories={categories}></CompanionForm>
  )
}
