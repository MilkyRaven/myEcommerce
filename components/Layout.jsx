import React from 'react'
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout( {children} ) {
  return (
    <div className='layout'>
      <Head>
        <title>Milky Store</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}
