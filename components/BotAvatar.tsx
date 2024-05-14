import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Companion } from '@prisma/client'

export default function BotAvatar({
    companion
}:{companion:Companion}) {
  return (
    <Avatar>
  <AvatarImage src={companion.src} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
  )
}
