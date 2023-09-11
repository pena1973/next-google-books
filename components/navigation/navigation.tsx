import Link from 'next/link';
import styles from "./navigation.module.css";

 export default function Navigation() {
   return (
    <nav>
    <ul className={styles.header_nav}>    
    {/* образец два класса */}        
        <li className={ [styles["header_nav_item"], styles["active"] ].join(" ")}> <Link href="/">books</Link> </li>
        <li className={styles.header_nav_item}><Link href="/audiobooks">audiobooks</Link></li>
        <li className={styles.header_nav_item}><Link href="/gifts">Stationery & gifts</Link></li>
        <li className={styles.header_nav_item}><Link href="/blog">blog</Link></li>
    </ul>
</nav>

   );
 }