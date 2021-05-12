import { Button } from '@material-ui/core'
import { signIn, signOut, getSession } from 'next-auth/client'

function auth() {
  return (
    <div>
      <Button onClick={() => signIn()}>Login</Button>
      <Button onClick={() => signOut()}>Signout</Button>
    </div>
  )
}

export default auth
