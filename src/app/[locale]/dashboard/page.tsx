'use client'

import SignOut from '@/forms/sign-out/form'
import { authClient } from '@/lib/auth-client'

const DashboardPage = () => {
  const { data: session } = authClient.useSession()

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOut />
    </div>
  )
}

export default DashboardPage
