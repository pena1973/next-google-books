
import styles from "./login.module.css";
import { useRouter } from 'next/navigation';
import { setMail, setName, setAbout, setPass } from '@/pages/store/slices';
import { useAppDispatch } from "@/pages/_app";

export interface LoginProps {
  handleLoginClick: () => void,
}

export default function Login(
  { handleLoginClick }: LoginProps
) {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  'use client'
  const handleClick = async function (e: React.MouseEvent<HTMLElement>) {

    // приведение типа    
    let login = (e.currentTarget.parentElement?.children[2] as HTMLInputElement).value;
    let pass = (e.currentTarget.parentElement?.children[4] as HTMLInputElement).value;

    const res = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ 'email': login, 'password': pass }),
    });

    if (res.status !== 200) {
      // push('/404');  

    } else {
      const receivedData = await res.json();
      if (!receivedData.error) {
        // если  успешно сохраняем в персист идем в профиль
        dispatch(setMail(receivedData.mail));
        dispatch(setName(receivedData.name));
        dispatch(setAbout(receivedData.about));
        dispatch(setPass(receivedData.pass));
        push(`/profile`);
      }
      else {
        // push('/404');
      }
    }
    handleLoginClick();
  }


  return (
    <div className={styles.header_login}>
      <p className={styles.header_login_title}>Log in</p>
      <label className={styles.label} htmlFor="login">Email</label>
      <input className={styles.login_input} name="login"
        placeholder="example.@mail.com" type="email"
        autoFocus maxLength={20}></input>
      <label className={styles.label} htmlFor="pass">Password</label>
      <input className={styles.pass_input} name="pass"
        placeholder="************" type="password"
        autoFocus maxLength={20}></input>
      <p className={styles.header_login_note}>Your password must be at least 6 characters long</p>
      <button type="submit" className={styles.login_button} onClick={(e) => handleClick(e)}>LOG IN</button>
    </div>

  );
}