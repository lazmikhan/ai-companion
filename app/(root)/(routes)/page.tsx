
import Categories from '@/components/Categories';
import Companions from '@/components/Companions';
import SearchInput from '@/components/searchInput'
import prismadb from '@/lib/prismadb';
import React from 'react'
interface RootPageInterface{
  searchParams:{
    categoryId:string,
    name:string
  }
}
async function RootPage({searchParams}:RootPageInterface) {
  const categories = await prismadb.category.findMany();
  const data = await prismadb.companion.findMany(
    {
      where :{
        categoryId: searchParams.categoryId,
        name:{
          search: searchParams.name
        }
      },
      orderBy:{
        createdAt:"desc"
      },
      include:{
        _count:{
          select:{
            messages:true
          }
        }
      }
    }
  )
  console.log(categories);
  return (
  <div className='h-full  p-4 space-y-2'>
 <SearchInput />
<Categories data={categories}/>
<Companions data={data}/>
  </div>
  )
}

export default RootPage
