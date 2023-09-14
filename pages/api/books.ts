import { NextApiRequest, NextApiResponse } from 'next';
import { Item } from '@/pages/store/slices';

type RawItem = {
    id: string,
    selfLink: string,
    volumeInfo: {
        subtitle:string,
        title:string,
        authors:string[],
        imageLinks:{smallThumbnail:string}
        pageCount:number,
        categories:string[]
    },
        saleInfo: {
            saleability:string,
            retailPrice:{amount:number,currencyCode:string}
        },             
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        res.status(405).send({ error: true, message: 'Only GET' })
    }

    //  загруз книг по 6 и  выдача 
    const { subject, page } = req.query; //забираю параметры
    
    // На пропущеную категорию не прроеряю поскольку 
    // апи вообще не смотрит на категорию при загрузке, и получается ерунда
    //  if (!req.query.subject) {        
    //      res.status(400).send({
    //          error: true,
    //          message: 'No subject in query params'
    //      })
    //  }

    const gbooksReqParams = new URLSearchParams();
    gbooksReqParams.set('q', '""');
    gbooksReqParams.set('subject', `${subject}`);
    gbooksReqParams.set('key', `AIzaSyCCjrE5pqwH7hoFMHZ3IhEcNp8U-Imtu3w`);
    gbooksReqParams.set('printType', `books`);
    gbooksReqParams.set('startIndex', `${page}`);
    gbooksReqParams.set('maxResults', `6`);
    gbooksReqParams.set('langRestrict', `en`);

    const res1 = await fetch(`https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}`)
    const requestResult = await res1.json();

    // немножко обработаю результат перед тем как выдать
    let newItems = <RawItem[]> requestResult.items;
    
    // если результат не удался ВЫДАЮ ОШИБКУ
    if (!newItems) res.status(400).send({ error: true,  message: 'QUERRY FALL'}); 
    
    // обрабатываю
    let categories:string[] = []; // весь каталог
    let books:Item[] = [];        // состав текущей категории
   
    // из апи вылетают дубли,
    // а потом это приводит к тому что 
    // Key элементов не уникальный и все двоится на форме
    // поэтому я отсекаю те книги которые уже есть в скачанном каталоге ранее
    
    for (let index = 0; index < newItems.length; index++) {
        const element = newItems[index];
        // если дуюль пропускаю
        if (books.find((el)=>{return(el.id === element?.id)})){continue;}
        
        const item:Item  = {
            id: "",
            autor: "",
            name: "",
            stars: 0,
            review: 0,
            description: "",
            price: 0,
            currency:"",
            url: "",
            categories:[],};

        item.id = element?.id;

        //название укоротим
        let title = element?.volumeInfo?.title;
        item.name = (title.length > 40) ? title.slice(0, 40) + '...' : title;
        // описание укоротим
        let description = (!element?.volumeInfo?.subtitle) ? '' : element?.volumeInfo?.subtitle;
        item.description = (description.length > 100) ? description.slice(0, 100) + '...' : description;
        // авторы запишем в строку
        let authorsArray = element?.volumeInfo?.authors;
        item.autor = '';
        if (authorsArray) {
            item.autor = authorsArray.join(',');
        }
        // обложка ссылка если ее нет заменяю на свою картинку
        item.url = (!element?.volumeInfo?.imageLinks?.smallThumbnail) ? '/book.jpg' : element?.volumeInfo?.imageLinks?.smallThumbnail;
        
        // оценку в ответе апи не нашла
        item.stars = -1;
        // отзывы заменила страницами книги 
        item.review = (!element?.volumeInfo?.pageCount) ? -1 : element?.volumeInfo?.pageCount;
        //цена и валюта        
        if (element?.saleInfo?.saleability != "NOT_FOR_SALE") {
            item.price = (!element?.saleInfo?.retailPrice?.amount) ? -1 : element?.saleInfo?.retailPrice?.amount;            
            item.currency = (!element?.saleInfo?.retailPrice?.currencyCode) ? '' : element?.saleInfo?.retailPrice?.currencyCode;            
        }

        item.categories = element?.volumeInfo?.categories;
        if (!item.categories) item.categories = ['Whithout category']; 
        
        item.categories.forEach(category => {
            if (!categories.includes(category)) 
            categories.push(category);
        });
        
        books.push(item);    
    };   

    res.status(200).send( {error: false,  books: books, categories:categories})
}


