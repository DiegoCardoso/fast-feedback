import { createContext, useContext, useEffect, useState } from "react"
import { createUser } from "@/lib/db"
import firebase from './firebase'

const authContext = createContext()

export function AuthProvider({children}) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleUser = rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser)
      const { token, ...userWithoutToken } = user

      setLoading(false)
      createUser(user.uid, userWithoutToken)
      setUser(user)
      return user
    } else {
      setLoading(false)
      setUser(false)
      return false
    }
  }

  const signinWithGithub = () => {
    setLoading(true)
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => handleUser(response.user))
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
  }

  useEffect(() => {
    const unsubsribe = firebase.auth().onAuthStateChanged(handleUser)

    return () => unsubsribe()
  }, [])

  return {
    user,
    loading,
    signinWithGithub,
    signout
  }
}

/**
 * 
 * @param {import("firebase").User} user 
 */
const formatUser = user => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: user.xa,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL
})