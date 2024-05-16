import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Companion } from '@prisma/client'
import { useUser } from '@clerk/nextjs'

export default function UserAvatar() {
  const {user} = useUser();
  return (
    <Avatar>
  <AvatarImage src={user?.imageUrl} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
  )
}
