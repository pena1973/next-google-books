import { Montserrat } from 'next/font/google';
import styles from "./layout.module.css";

import Image from 'next/image'
import Link from 'next/link';
import Head from "next/head";

import { PropsWithChildren,useState } from "react";
import { useSelector } from 'react-redux';
import {useRouter } from 'next/navigation';
import { RootState } from "@/pages/_app";

import Navigation from "@/components/navigation/navigation";
import Login from "@/components/login/login";

// не понимаю где в своем проекте я могу это применить если все шрифты расставлены в стилях и они разные
  const font = Montserrat({
    weight: ["400","500","600","700"],
    subsets: ["latin", "cyrillic"],
})

export default function Layout({ children }: PropsWithChildren) {
  const { push } = useRouter();  
  const [loginState, setLoginState] = useState(false);
  
  const quantity = useSelector((state: RootState) => {    
    return state.cardSlice.quantity;
  })

  const mail = useSelector((state: RootState) => {    
    return state.authSlice.mail;
  })
  const pass = useSelector((state: RootState) => {    
    return state.authSlice.pass;
  })
  const handleLoginClick = () => {
    setLoginState(false);
  }

  const handleClick = () => {

    //  если пароль и логин есть хран - перехожу в профиль 
    //   если нет открываю форму логина

    if ((mail !== undefined) && (pass !==undefined)) { setLoginState(!loginState);  push(`/profile`); };

    setLoginState(!loginState);}

  return (
    <>
      <Head>
        <title>Bookshop</title>
        <meta name="description" content="Bookshop Next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />        
        <meta name="author" content="Natalia" />
      </Head>
      <header className={[styles["header"], styles["container"]].join(" ")}>
        <Link href="/" className={styles.header_logo}>Bookshop</Link>
        <Navigation />
        <div className={styles.header_icons}>          
          <Image className={styles.click_icon} src={'/user.svg'} width={12} height={12} onClick={handleClick} alt="user.svg" />
          {/* логин форма */}
          {loginState && <Login handleLoginClick={handleLoginClick} />}
          <Link className={styles.header_icons_item_card} href="/card">
            <Image className={styles.click_icon} src={'/shop bag.svg'} width={12} height={12} alt="cardSVG" />
            {(quantity>0) && <div className={styles.header_icons_item_count}>{quantity}</div>}
          </Link>
        </div>

      </header>


      <main className={[styles["main"], styles["container1"]].join(" ")}>{children}</main>

      <footer className={styles.footer}>
        
      </footer>
      
    </>
  );
}
