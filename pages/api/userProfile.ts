import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== 'GET') {
        res.status(405).send({ error: true, message: 'Only POST' })
    }
    // по токену выдали профиль
    const {token} = req.body;
    // запрос данных юзера 
    res.status(200).send({ error: false, name: 'John Smith', mail: 'example@mail.com', 
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat,
    ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor
    quis ipsum. Proin mollis pellentesque nulla ac varius.` });
    
}