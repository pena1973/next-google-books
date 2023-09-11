import Image from 'next/image'
import arrow from "./arrow.svg";
import { PropsWithChildren } from "react";
import styles from "./slider.module.css";
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from "react";
import url1 from "./slide1.jpg"
import url2 from "./slide2.jpg"
import url3 from "./slide3.jpg"
// слайдер
let images = [{
  id: 1,
  url: url1,
  title: "slide1"
}, {
  id: 2,
  url: url2,
  title: "slide2"
}, {
  id: 3,
  url: url3,
  title: "slide3"
},];

// настройки слайдера

let options = {
  dots: true,
  titles: true,
  autoplay: false,
  autoplayInterval: 5000
};

export default function Slider({ children }: PropsWithChildren) {
  // состояние слайдера
  const [sliderState, setSliderState] = useState(0);
  const handleClickDot = (e:React.MouseEvent<HTMLElement>)=>{
    const div = e.target as HTMLDivElement;
    setSliderState(Number(div.dataset.id));    
  }
  return (
    <section>
      <div className={styles.slider}>
        <div className={styles.slider_images}>
          <Image className={[styles.image, styles.active].join(" ")} src={images[sliderState].url} alt={images[sliderState].title}/>          
        </div>
        <div className={styles.slider_dots}>
          <div className={[styles.slider_dots_item, (sliderState === 0) ? styles.active : ""].join(" ")} onClick={(e)=>handleClickDot(e)} data-id="0" ></div>
          <div className={[styles.slider_dots_item, (sliderState === 1) ? styles.active : ""].join(" ")} onClick={(e)=>handleClickDot(e)} data-id="1" ></div>
          <div className={[styles.slider_dots_item, (sliderState === 2) ? styles.active : ""].join(" ")} onClick={(e)=>handleClickDot(e)} data-id="2" ></div>
        </div>
      </div>

      <div className={styles.slider_cover}>
        <a className={styles.slider_cover_violet_square} href="#">
          <span className={styles.slider_cover_violet_square_text}>Change old book on new</span>
          <Image className={styles.slider_cover_violet_square_arrow} src={arrow} alt="arrow.svg" />
        </a>

        <a className={styles.slider_cover_rose_square} href="#">
          <span className={styles.slider_cover_rose_square_text}>top 100 books 2022</span>
          <Image className={styles.slider_cover_violet_square_arrow} src={arrow} alt="arrow.svg" />
        </a>
      </div>
    </section>
  )
};