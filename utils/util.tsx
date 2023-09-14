


import { Item, ItemInCard } from '@/pages/store/slices';

export function recountCard(card: ItemInCard[]) {

    let total = 0;
    let quantity = 0;
    card.forEach((el) => {
        total= total + (el.count * el.book.price);
        quantity= quantity + el.count;
    })


    return {
        quantity: quantity,
        total: rounded(total)
    }
}

const rounded = function(number:number){
    return +number.toFixed(2);
}

export function sortCard(card: ItemInCard[]) {

    card.sort((a, b) => {
        const idA = a.book.id;
        const idB = b.book.id;
        if (idA > idB) {
          return -1;
        }
        if (idA < idB) {
          return 1;
        }
        // names must be equal
        return 0;
      })

    return card;
}

export function sortCatalog(items: Item[]) {

    items.sort((a, b) => {
        const idA = a.id;
        const idB = b.id;
        if (idA > idB) {
          return -1;
        }
        if (idA < idB) {
          return 1;
        }
        // names must be equal
        return 0;
      })


    return items;
}

export function addtoCard(card: ItemInCard[], book: Item) {

    let newCard = [...card];

    const indexBookToBuy = newCard.findIndex((element) => {
        return (element?.book.id == book.id)
    });
    if (indexBookToBuy === -1) {
        newCard.push({ book: book, count: 1, delivery: 'shipping', });
    } else {
        newCard.push({ book: book, count: newCard[indexBookToBuy].count + 1, delivery: 'shipping', });  // добавили обновленный     
        newCard.splice(indexBookToBuy, 1);   // удалили старый                           
    }
    return newCard;
}

export function deletefromCard(card: ItemInCard[], book: Item) {

    let newCard = [...card];

    const indexBookToBuy = newCard.findIndex((element) => {
        return (element?.book.id == book.id)
    });

    if (indexBookToBuy === -1) {
        // предмета нет в карзине
        return newCard;
    } else {
        if (newCard[indexBookToBuy].count > 1) {
            newCard.push({ book: book, count: newCard[indexBookToBuy].count - 1, delivery: 'shipping', });  // добавили обновленный     
            newCard.splice(indexBookToBuy, 1);   // удалили старый                           
        }
        else {
            newCard.splice(indexBookToBuy, 1);   // удалили
        }
    }
    return newCard;
}

export function addNewCategories(categories: string[], receivedCategories:string[]) {
  
    let newCategories = [...receivedCategories];        
    
    categories.forEach(category => {
      if (!newCategories.includes(category)) newCategories.push(category);
    });

    return newCategories;
}

export function addtoCatalogNewItems(catalog: Item[], receivedItems:Item[]) {
  
    let newCatalog = [...receivedItems];        
    
    catalog.forEach(item => {
    let potentialItem = newCatalog.find((e)=>{return(e.id===item.id)})
      if (!potentialItem)   newCatalog.push(item);
    });

    return newCatalog;
}
