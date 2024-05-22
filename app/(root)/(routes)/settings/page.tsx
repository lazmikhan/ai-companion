
import SubscriptionButton from '@/components/SubscriptionButton';
import { checkSubscription } from '@/lib/subscription'
import React from 'react'

export default async function Settingss() {
    const isPro = await checkSubscription();
  return (
    <div className=' h-full p-4 space-y-2'>
    <h3 className='text-lg font-medium'>Settings</h3>
    {isPro? "Your are currently on a pro plan":"Your are currently on a free plan"}
    <div>
    <SubscriptionButton isPro={isPro}/>
    </div>
    </div>
  )
}
