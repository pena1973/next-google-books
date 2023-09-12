// 'use client'

import Image from 'next/image'
import Layout from "@/components/layout/layout";
import { useSelector } from 'react-redux';
import { RootState } from "@/pages/_app";

export default function Home() {
  
  const mail = useSelector((state: RootState) => {    
    return state.authSlice.mail;
  })

  const name = useSelector((state: RootState) => {    
    return state.authSlice.name;
  })
  const about = useSelector((state: RootState) => {    
    return state.authSlice.about;
  })
  
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