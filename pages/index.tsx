
import Layout from "@/components/layout/layout";
import Slider from "@/components/slider/slider";
import Book from "@/components/book/book";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { RootState, useAppDispatch } from "@/pages/_app";
// import styles from "../styles/style.css";
import { redirect, useRouter } from 'next/navigation';
import { setPage, setCatalog, setCategories, setFilter, setBooks, setCard,setError,setTotal ,setQuantity } from '@/pages/store/slices';
import { Item, ItemInCard } from '@/pages/store/slices'
import { error } from "console";
import {recountCard,addtoCard,addNewCategories,addtoCatalogNewItems} from '@/pages/store/util'

// let books =[
//   {id:1,
//   autor:"Kevin Kwan",
//   name:"Crazy rich asians",
//   stars: 5,
//   review:230,  
//   description:"the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...",
//   price: 44.50,
//   url:"/book.jpg"
// }, 
//   {id:2,
//   autor:"Kevin Kwan",
//   name:"Crazy rich asians",
//   stars: 2,
//   review:200,  
//   description:"the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...",
//   price: 124.50,
//   url:"/book1.png"},
//   {id:3,
//     autor:"Kevin Kwan",
//     name:"Crazy rich asians",
//     stars: 3,
//     review:152,  
//     description:"the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...",
//     price: 4.50,
//     url:"/book2.png"}      
// ];

export default function Home() {
  const { push } = useRouter();
  const dispatch = useAppDispatch();


  const page = useSelector((state: RootState) => {
    return state.workSlice.page;
  })
  const books = useSelector((state: RootState) => {
    return state.workSlice.books;
  })
  const catalog = useSelector((state: RootState) => {
    return state.workSlice.catalog;
  })
  let filter = useSelector((state: RootState) => {
    return state.filter1Slice.filter;
  })

  const categories = useSelector((state: RootState) => {
    return state.workSlice.categories;
  })

  const card = useSelector((state: RootState) => {
    return state.cardSlice.card;
  })
  const error= useSelector((state: RootState) => {
    return state.workSlice.error;
  })
  const message= useSelector((state: RootState) => {
    return state.workSlice.message;
  })

  // фильтрую по категории
  let booksReactNodes = books.map(book => (
    <Book
      key={book.id}
      book={book}
      onBuy={(book) => onBuy(book)} />
  ))

  let catrgoriesReactNodes = categories.map(
    element => (
      //  <li className="catalog-menu-nav-item" data-category={element} key={element} ><a href="#">{element}</a></li>
      <li className={`catalog-menu-nav-item ${(element === filter) ? "active" : ""}`} data-category={element} key={element} onClick={(e) => handleClickCategory(e)}>{element}</li>
    )
  )

  const onBuy = (book: Item) => {

    let newCard =  addtoCard(card,book)
  
      dispatch(setCard(newCard))
      const {quantity,total} = recountCard(newCard);
      dispatch(setQuantity(quantity));
      dispatch(setTotal(total));    
  };

  const handleClickCategory = (e: React.MouseEvent<HTMLElement>) => {
    let li = e.target as HTMLDivElement;
    let parent = li.parentElement;
    const filter = li.dataset.category as string;

    for (let index = 0; index < 3; index++) {
      const child = parent?.children[index];
      child?.classList.remove('active');
    }
    li.classList.add("active");
    handleFilter(filter,catalog);
  }

  const handleFilter = (filter: string,commonCatalog:Item[]) => {
    // здесь передать состояние переключателя в редукс  
    dispatch(setFilter(filter));
    let newbooks = commonCatalog.filter((e) => {return(e.categories.includes(filter))});
    dispatch(setBooks(newbooks));
  }

  const load = async () => {
    const res = await fetch(`http://localhost:3000/api/books?subject=${filter}&page=${page + 1}`);

    if (res.status !== 200) {
      dispatch(setError(`Стаmус ${res.status}`))      

    } else {
      const receivedData = await res.json();
      if (!receivedData.error) {

        let commonCategories =  addNewCategories(categories, receivedData.categories)
        let commonCatalog =  addtoCatalogNewItems(catalog, receivedData.books)

        dispatch(setPage(page + 1));
        dispatch(setCatalog(commonCatalog));
        dispatch(setCategories(commonCategories));
        dispatch(setError(``)); // нет ошибки      
        // если фильтр не заполнен то берем самую первую категорию
        if (!filter) {
          filter = commonCategories[0];
          // прорисуем 
        }
        handleFilter(filter,commonCatalog);
      }
      else {
        push('/404');
      }
    }
  }

  const handleClickMore = (e: React.MouseEvent<HTMLElement>) => {
    let div = e.target as HTMLDivElement;
    if (div.id === 'loadMore') load();
  }

  // загруз на старте
  useEffect(() => {
    load();
  }, []);

  return (
    <Layout>
      <Slider />
      {error && <section className="error">{message}</section>}
      {!error && <section className="catalog">
        <nav className="catalog-menu">
          <ul className="catalog-menu-nav">
            {catrgoriesReactNodes}
          </ul>
        </nav>
        <div className="catalog-field">
          <div className="catalog-show">
            {booksReactNodes}
          </div>

          <div className="catalog-download">
            <button id='loadMore' className="catalog-download-btn" onClick={(e) => handleClickMore(e)}>Load more</button>
          </div>
        </div>

      </section>}

      {/* </main> */}
    </Layout>
  )

}