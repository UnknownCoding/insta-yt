import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Modal from '../components/Modal';

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen scrollbar-hide ">
      <Head>
        <title>Insta We UP</title>
        <link rel='icon' href="/favicon.ico"></link>
      </Head>
      <Header></Header>
      <Feed></Feed>
      <Modal/>
    </div>
  )
}
