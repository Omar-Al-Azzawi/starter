'use client'

import SignOut from '@/forms/sign-out/form'
import { authClient } from '@/lib/auth-client'
// import { redirect } from 'next/navigation'

const DashboardPage = () => {
  const {
    data: session,
    //  isPending
  } = authClient.useSession()

  // if (!session && !isPending) {
  //   return redirect('/')
  // }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOut />
    </div>
  )
}

export default DashboardPage
