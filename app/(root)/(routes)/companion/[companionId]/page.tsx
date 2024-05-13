import prismadb from '@/lib/prismadb'
import React from 'react'
import CompanionForm from '@/components/CompanionForm'
interface CompanionIdProps{
    params:{
        companionId:string
    }
}
export default async function CompanionId({params}:CompanionIdProps) {
//check subscription

const companion = await prismadb.companion.findUnique({
where:{
    id: params.companionId
}
})
const categories = await prismadb.category.findMany();


  return (
  <CompanionForm initialData={companion} categories={categories}></CompanionForm>
  )
}
