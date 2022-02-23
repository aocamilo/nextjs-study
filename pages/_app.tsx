import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light position-absolute top-0 w-100 px-5">
          <div className="container-fluid">
            <Link href="/">
              <a className="navbar-brand">Milo</a>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/pokemon"><a className="nav-link active" aria-current="page">Pokemon</a></Link>
                </li>
                <li className="nav-item">
                  <Link href="/rickandmorty"><a className="nav-link active" aria-current="page">Rick And Morty</a></Link>
                </li>
                <li className="nav-item">
                  <Link href="/milos-blog/compound-components-in-react"><a className="nav-link active" aria-current="page">Compound Components</a></Link>
                </li>
                <li className="nav-item">
                  <Link href="/milos-blog/controlled-props-components-in-react"><a className="nav-link active" aria-current="page">Controlled Props</a></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Component {...pageProps} />
      </main>
      <footer className={styles.footer}>
        <p>Made By Camilo Arango - 2022 - 🇨🇴 </p>
      </footer>
    </div>
  )
}

export default MyApp
