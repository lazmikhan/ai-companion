
import Categories from '@/components/Categories';
import SearchInput from '@/components/searchInput'
import prismadb from '@/lib/prismadb';
import React from 'react'

async function RootPage() {
  const categories = await prismadb.category.findMany();
  console.log(categories);
  return (
  <div className='h-full  p-4 space-y-2'>
 <SearchInput />
<Categories data={categories}/>
  </div>
  )
}

export default RootPage
