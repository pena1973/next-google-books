// 'use client'

import Image from 'next/image'
import Layout from "@/components/layout/layout";
import { redirect, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";

// пример для редкого получения данных
// type Data = {
//   data: {
//     userId: number,
//     name:string,  
//     mail: string, 
//     about: string 
//   }
// }


// export const getStaticProps = async () =>{


//   // const userId = localStorage.getItem("userId");

//   const res = await fetch('http://localhost:3000/api/userProfile?userId=1');

//   console.log(2);

//   const receivedData = await res.json();
//   console.log(3);
//   return {
//     props: {
//       data: receivedData,
//     }
//   }
// }


export default function Home() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [about, setAbout] = useState("");

  
  // забираю данные по токену сеанса
  'use client'
  const getProfile = async () => {
    
    const token = localStorage.getItem('token');

    if (!token) {
      setName("");
      setMail("");
      setAbout("");
      return
    }

    const res = await fetch('http://localhost:3000/api/userProfile?token=' + token);
    if (res.status !== 200) {
      redirect('/404'); 
    } 
    
    const receivedData = await res.json();
    
    if (receivedData.error) {
        setName("");
        setMail("");
        setAbout("");
        console.log("Истекло время токена");
      } else {
      setName(receivedData.name);
      setMail(receivedData.mail);
      setAbout(receivedData.about);
    }    
  }

  getProfile();

  return (
    <Layout>
      <section className="user">
        <div className="user-foto">
          <div className="user-title">PROFILE</div>
          <Image className="user-foto-img" width={12} height={12} src={'/user-big.svg'} alt="" />
        </div>
        <div className="user-data">
          <p className="user-data-title-name">YOUR NAME</p>
          <p className="user-data-name">{name}</p>
          <p className="user-data-title-email">YOUR EMAIL</p>
          <p className="user-data-email">{mail}</p>
          <button className="user-data-button">EDIT PROFILE</button>
        </div>

        <div className="user-about">
          <h1 className="user-about-title">ABOUT ME</h1>
          <p className="user-about-text">{about}</p>
        </div>
      </section>
    </Layout>
  )
}