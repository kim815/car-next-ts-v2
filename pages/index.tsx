import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import styles from '../styles/Home.module.scss'
import Login from './login'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router=useRouter();
  return (
    <div>

    <Login/>
    </div>
    
  )
}

export default Home;
