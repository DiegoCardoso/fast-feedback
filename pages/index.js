import Head from 'next/head'
import { useAuth } from '../utils/auth'
import styles from '../styles/Home.module.css'

export default function Home() {
  const auth = useAuth()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Fast Feedback
        </h1>
        <>
        {auth.user ? (
          <div>
            <p>Email: {auth.user.email}</p>
            <button onClick={() => auth.signout()}>Sign Out</button>
          </div>
        ) : (
          <button onClick={() => auth.signinWithGithub()}>Sign In with GitHub</button>
        )}
        </>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
