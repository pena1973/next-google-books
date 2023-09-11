import Image from 'next/image'
import { PropsWithChildren } from "react";
import Link from 'next/link';
import styles from "./layout.module.css";
import Head from "next/head";
import { redirect, useRouter } from 'next/navigation';

import { usePathname } from 'next/navigation'
import Navigation from "../navigation/navigation";
import Login from "../login/login";
import { useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from "@/pages/_app";

export default function Layout({ children }: PropsWithChildren) {
  const { push } = useRouter();
  const [loginState, setLoginState] = useState(false);
  // const pathname = usePathname();
  
  const quantity = useSelector((state: RootState) => {    
    return state.cardSlice.quantity;
  })

  const handleLoginClick = () => {
    setLoginState(false);
  }

  const handleClick = async () => {
    const login = localStorage.getItem('login');
    const pass = localStorage.getItem('pass');    
    // localStorage.clear()
    //  беру пароль и логин из хран и  получаю токен(он живет час), ели токен пришел  -  кладу в  хранилище и редирект на профиль   
    //   если токен не получен  -  стою на странице и открываю форму логина

    if ((!login) || (!pass)) { setLoginState(!loginState); return };


    const res = await fetch(`http://localhost:3000/api/auth?email=${login}&password=${pass}`);

    if (res.status == 200) {

      const receivedData = await res.json();
      if (!receivedData.error) {
        localStorage.setItem('token', receivedData.token);
        push(`/profile`);
      } else {
        setLoginState(!loginState);
      }
    } else {
      setLoginState(!loginState);
    }
  }

  return (
    <>
      <Head>
        <title>Bookshop</title>
        <meta name="description" content="Bookshop Next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header container">
        <Link href="/" className={styles.header_logo}>Bookshop</Link>
        <Navigation />

        <div className={styles.header_icons}>
          {/* <Link className={styles.header_icons_item_user} href="/profile">
            <Image src={userSVG} alt="./images/user.svg" />
          </Link> */}
          <Image className={styles.click_icon} src={'/user.svg'} width={12} height={12} onClick={handleClick} alt="user.svg" />
          {/* логин форма */}
          {loginState && <Login handleLoginClick={handleLoginClick} />}
          <Link className={styles.header_icons_item_card} href="/card">
            <Image className={styles.click_icon} src={'/shop bag.svg'} width={12} height={12} alt="cardSVG" />
            {(quantity>0) && <div className={styles.header_icons_item_count}>{quantity}</div>}
          </Link>
        </div>

      </header>


      <main className={[styles["main"], styles["container"]].join(" ")}>{children}</main>

      <footer className={styles.footer}>
        {/* <div>&copy; 2023 Web studio</div>
          <a href={`mailto:${FOOTER_EMAIL}`}>{FOOTER_EMAIL}</a> */}
      </footer>
      {/* </div> */}
    </>
  );
}