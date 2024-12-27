'use client'

import { authClient } from '@/lib/auth-client'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
const ProfilePage = () => {
  const { data } = authClient.useSession()

  return (
    <main>
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center md:flex-row md:items-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src={data?.user.image || undefined} alt={data?.user.name} />
            <AvatarFallback>{data?.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-2xl font-bold">{data?.user.name}</h1>
            <p className="text-muted-foreground">{data?.user.email}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button>Edit Profile</Button>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
