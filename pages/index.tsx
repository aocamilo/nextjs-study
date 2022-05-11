import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Learn App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p data-testid="message">
          This is an app made to study and understand some concepts about
          Nextjs, SSR, SSG, CSR, and more... Please use the nav.
        </p>
      </main>
    </div>
  );
};

export default Home;
