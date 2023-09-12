'use client'
import Image from 'next/image'
import Layout from "@/components/layout/layout";
import { ItemInCard } from '@/pages/store/slices'
import { useSelector } from 'react-redux';
import { setTotal, setQuantity, setCard } from '@/pages/store/slices';
import { RootState, useAppDispatch } from "@/pages/_app";
import { recountCard, addtoCard, deletefromCard, sortCard } from '@/pages/store/util'

let card = [
  {
    id: 1,
    autor: "Kevin Kwan",
    name: "Crazy rich asians",
    stars: 5,
    review: 230,
    price: 4.55,
    count: 1,
    url: "/book.jpg",
    delivery: 'shipping',
  },
  {
    id: 2,
    autor: "Kevin Kwan",
    name: "Crazy rich asians",
    stars: 2,
    review: 200,
    price: 4.55,
    count: 1,
    url: "/book1.png",
    delivery: 'shipping',
  },
  {
    id: 3,
    autor: "Kevin Kwan",
    name: "Crazy rich asians",
    stars: 3,
    review: 152,
    price: 4.55,
    count: 1,
    url: "/book2.png",
    delivery: 'shipping',
  }
];


export default function Card(

) {
  const dispatch = useAppDispatch();

  const card = useSelector((state: RootState) => {
    return state.cardSlice.card;
  })

  const total = useSelector((state: RootState) => {
    return state.cardSlice.total;
  })


  const onClickPlus = (e: React.MouseEvent<HTMLElement>) => {
    let div = e.target as HTMLDivElement;
    let parent = div.parentElement as HTMLDivElement;
    const id = parent.dataset.id;
    const itemInCard = card.find((element) => { return (element?.book.id == id) });
    if (!itemInCard) return

    let newCard = addtoCard(card, itemInCard.book)    
    dispatch(setCard(sortCard(newCard)));
    const { quantity, total } = recountCard(newCard);
    dispatch(setQuantity(quantity));
    dispatch(setTotal(total));
  }

  const onClickMinus = (e: React.MouseEvent<HTMLElement>) => {
    let div = e.target as HTMLDivElement;
    let parent = div.parentElement as HTMLDivElement;
    const id = parent.dataset.id;
    const itemInCard = card.find((element) => { return (element?.book.id == id) });
    if (!itemInCard) return

    let newCard = deletefromCard(card, itemInCard.book)
    dispatch(setCard(sortCard(newCard)))
    const { quantity, total } = recountCard(newCard);
    dispatch(setQuantity(quantity));
    dispatch(setTotal(total));

  }

  let cardReactNodes = card.map(element => (
    <tr className="card-row" key={element.book.id}>
      <td className="card-table-td">
        <div className="card-table-td-item">
          <Image className="card-table-img-item" src={element.book.url} alt={element.book.url} width={100} height={145} />
          <div className="card-table-info-item">
            <div className="card-table-title-item">{element.book.name}</div>
            <div className="card-table-autor-item">{element.book.autor}</div>
            <div className="card-table-rate-item">
              <Image className="card-table-rate-star" src={(element.book.stars > 0) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
              <Image className="card-table-rate-star" src={(element.book.stars > 1) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
              <Image className="card-table-rate-star" src={(element.book.stars > 2) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
              <Image className="card-table-rate-star" src={(element.book.stars > 3) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
              <Image className="card-table-rate-star" src={(element.book.stars > 4) ? "/star_gold.svg" : "/star_gray.svg"} width={12} height={12} alt="star.svg" />
              <div className="card-table-rate-review">{element.book.review} reviews</div>
            </div>
          </div>
        </div>
      </td>
      <td className="card-table-td">
        <div className="card-plus-minus" data-count={element.count} data-id={element.book.id}>
          <button className="card-plus" onClick={(e) => onClickPlus(e)}>+</button>
          <div className="card-count">{element.count}</div>
          <button className="card-minus" onClick={(e) => onClickMinus(e)}>-</button>
        </div>
      </td>
      <td className="card-table-td">
        <p className="card-table-price">{element.book.currency} {element.book.price}</p>
      </td>
      <td className="card-table-td">
        <p className="card-table-delivery">{element.delivery} delivery</p>
      </td>
    </tr>
  ))

  return (
    <Layout>
      <section className="card">
        <div className="card-title">SHOPPING CART</div>
        <table className="card-table">
          <thead className="card-thead">
            <tr>
              <th className="card-table-th">ITEM</th>
              <th className="card-table-th">QUANTITY</th>
              <th className="card-table-th">PRICE</th>
              <th className="card-table-th">DELIVERY</th>
            </tr>
          </thead>
          <tbody>
            {cardReactNodes}

          </tbody>
        </table>

        <div className="card-total-price">TOTAL PRICE: {total}</div>

        <button className="card-button-checkout">CHECKOUT</button>
      </section>


    </Layout>
  )
}