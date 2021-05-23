import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { signIn, signOut, getSession } from 'next-auth/client'

function auth() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState()

  useEffect(async () => {
    const userSession = await getSession()
    setSession(userSession)
    setLoading(false)
    console.log(userSession)
  }, [])

  const AuthButton = () => {
    if (session) {
      return <Button onClick={() => signOut()}>Signout</Button>
    }
    return <Button onClick={() => signIn()}>Login</Button>
  }

  return <>{!loading && <div><AuthButton /></div>}</>
}

export default auth
