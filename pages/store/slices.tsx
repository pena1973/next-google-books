import { createSlice } from '@reduxjs/toolkit';

export type Item = {
    id: string,
    autor: string,
    name: string,
    stars: number,
    review: number,
    description: string,
    price: number,
    currency: string,
    url: string,
    categories: string[],
}

export type ItemInCard = {
    book: Item
    count: number,
    delivery: string,
}

//   состояние филтер редюсора  на удаление
// export type FilterState = {
//     page: number, // номер скачанной итерации
//     card: ItemInCard[], // тек корзина
//     filter: string, // тек фильтр
//     user: { name: string, mail: string, about: string },
//     catalog: Item[], // все скачанные книги
//     categories: string[], // все категории книг
//     books: Item[], // текущие книги по тек фильтру 
//     error: boolean,
//     message: string,
//     quantity: number,
//     total: number,
// }
export type Filter1State = {
    filter: string, // тек фильтр
}
export type WorkState = {
    page: number, // номер скачанной итерации
    catalog: Item[], // все скачанные книги
    categories: string[], // все категории книг
    books: Item[], // текущие книги по тек фильтру  
    error: boolean,
    message: string,       
}
export type CardState = {
    card: ItemInCard[], // тек корзина
    filter: string, // тек фильтр
    quantity: number,
    total: number,
}
export type AuthState = {
    name: string,
    about: string,
    mail: string,
    pass: string,
}

// const filterIntialState: FilterState = {
//     page: 0,
//     card: [],
//     filter: '',
//     // filter: 'Whithout category',    
//     user: {
//         name: 'John Smith',
//         mail: 'example@mail.com',
//         about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat,
//      ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor
//      quis ipsum. Proin mollis pellentesque nulla ac varius.`},
//     catalog: [
//         {
//             id: "54564564654654",
//             autor: "Kevin Kwan",
//             name: "Crazy rich asians",
//             stars: 5,
//             review: 230,
//             description: "the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...",
//             price: 44.50,
//             currency: "$",
//             url: "/book.jpg",
//             categories: ['Architecture'],
//         },
//         {
//             id: "545645646354564654",
//             autor: "Kevin Kwan",
//             name: "Crazy rich asians",
//             stars: 2,
//             review: 200,
//             description: "the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...",
//             price: 124.50,
//             currency: "$",
//             url: "/book1.png",
//             categories: ['Architecture'],
//         },
//         {
//             id: "54564564653546145644654",
//             autor: "Kevin Kwan",
//             name: "Crazy rich asians",
//             stars: 3,
//             review: 152,
//             description: "the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...",
//             price: 4.50,
//             currency: "$",
//             url: "/book2.png",
//             categories: ['Architecture'],
//         }
//     ],
//     categories: [],
//     books: [],
//     error: false,
//     message: "",
//     quantity: 0,
//     total: 0,
// }
const filter1IntialState: Filter1State = {  
    filter: '',
    // filter: 'Whithout category',    
}
const workIntialState: WorkState = {
    page: 0,    
    catalog: [
        {
            id: "54564564654654",
            autor: "Kevin Kwan",
            name: "Crazy rich asians",
            stars: 5,
            review: 230,
            description: "the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...",
            price: 44.50,
            currency: "$",
            url: "/book.jpg",
            categories: ['Architecture'],
        },
        {
            id: "545645646354564654",
            autor: "Kevin Kwan",
            name: "Crazy rich asians",
            stars: 2,
            review: 200,
            description: "the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...",
            price: 124.50,
            currency: "$",
            url: "/book1.png",
            categories: ['Architecture'],
        },
        {
            id: "54564564653546145644654",
            autor: "Kevin Kwan",
            name: "Crazy rich asians",
            stars: 3,
            review: 152,
            description: "the outrageously funny debut novel  about three super-rich, pedigreed Chinese families and the gossip...",
            price: 4.50,
            currency: "$",
            url: "/book2.png",
            categories: ['Architecture'],
        }
    ],
    categories: [],
    books: [],
    error: false,
    message: "",
    
}
const cardIntialState: CardState = {    
    card: [],
    filter: '',
    quantity: 0,
    total: 0,
}
const authIntialState: AuthState = {
    name: 'John Smith',
    mail: 'example@mail.com',
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat,
     ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor
     quis ipsum. Proin mollis pellentesque nulla ac varius.` ,
    pass: "string",
}

// const filterSlice = createSlice({
//     name: 'filter',
//     initialState: filterIntialState,
//     reducers: {
//         setPage: (state, action) => {
//             state.page = action.payload;
//         },
//         setCard: (state, action) => {
//             state.card = action.payload;
//         },
//         setFilter: (state, action) => {
//             state.filter = action.payload;
//         },
//         setUser: (state, action) => {
//             state.user = action.payload;
//         },
//         setCatalog: (state, action) => {
//             state.catalog = action.payload;
//         },
//         setCategories: (state, action) => {
//             state.categories = action.payload;
//         },
//         setBooks: (state, action) => {
//             state.books = action.payload;
//         },
//         setError: (state, action) => {
//             state.message = action.payload;
//             state.error = (state.message !== "");
//         },
//         setQuantity: (state, action) => {
//             state.quantity = action.payload;
//         },
//         setTotal: (state, action) => {
//             state.total = action.payload;
//         },

//     },

// })
const workSlice = createSlice({
    name: 'work',
    initialState: workIntialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setCatalog: (state, action) => {
            state.catalog = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setError: (state, action) => {
            state.message = action.payload;
            state.error = (state.message !== "");
        },
        setBooks: (state, action) => {
            state.books = action.payload;
        },
    },

})
const filter1Slice = createSlice({
    name: 'filter1',
    initialState: filter1IntialState,
    reducers: {        
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        
    },

})
const authSlice = createSlice({
    name: 'auth',
    initialState: authIntialState,
    reducers: {
        setAbout: (state, action) => {
            state.about = action.payload;
        },
        setMail: (state, action) => {
            state.mail = action.payload;
        },
        setPass: (state, action) => {
            state.pass = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
    },

})
const cardSlice = createSlice({
    name: 'card',
    initialState: cardIntialState,
    reducers: {        
        setCard: (state, action) => {
            state.card = action.payload;
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload;
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        },

    },

})


// export const { setPage, setCard, setFilter, setUser, setCatalog, setCategories, setBooks, setError, setTotal, setQuantity } = filterSlice.actions;
export const { setFilter} = filter1Slice.actions;
export const { setPage, setCatalog, setCategories,  setError,setBooks } = workSlice.actions;
export const { setCard,  setTotal, setQuantity } = cardSlice.actions;
export const { setAbout, setMail, setPass, setName} = authSlice.actions;
export {  authSlice, cardSlice, filter1Slice, workSlice };