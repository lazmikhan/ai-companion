import { UserButton } from '@clerk/nextjs'
import React from 'react'

function RootPage() {
  return (
  <div>
    <UserButton afterSignOutUrl='/sign-in' />
  </div>
  )
}

export default RootPage
