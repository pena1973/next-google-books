'use client'
import Image from 'next/image'
import styles from "./book.module.css";
import {Item} from '@/pages/store/slices'

export interface BookProps {
  
  book: Item,
  onBuy: (id: Item) => (void)
}

export default function Book({
  
  book, onBuy
}: BookProps) {
const handleClickBuy =(e:React.MouseEvent<HTMLElement>)=>{
  onBuy(book)
}
  return (
    <div className={styles.catalog_show_block}>
      <div className={styles.catalog_show_block_frame}>
        <Image className={styles.catalog_show_block_img}
          src={book.url}
          width={210}
          height={325}
          alt="book.jpg" />
      </div>
      <div className={styles.catalog_show_block_info}>
        <p className={styles.catalog_show_block_info_autor}>{book.autor}</p>
        <p className={styles.catalog_show_block_info_name}>{book.name}</p>
        <div className={styles.catalog_show_block_info_esteeme}>
          <div>
            <Image className={styles.card_table_rate_star} src={(book.stars > 0) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
            <Image className={styles.card_table_rate_star} src={(book.stars > 0) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
            <Image className={styles.card_table_rate_star} src={(book.stars > 0) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
            <Image className={styles.card_table_rate_star} src={(book.stars > 0) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
            <Image className={styles.card_table_rate_star} src={(book.stars > 0) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
          </div>
          <p className={styles.catalog_show_block_info_esteeme_review}>{book.review} review</p>
        </div>
        <p className={styles.catalog_show_block_info_description}>{book.description}</p>
        <p className={styles.catalog_show_block_info_price}>${book.price}</p>
        <button className={styles.catalog_show_block_info_btn} onClick={(e) => handleClickBuy(e)} data-id={book.id}>buy now</button>
      </div>
    </div>
  )
};