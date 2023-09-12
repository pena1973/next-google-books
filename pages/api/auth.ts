import { NextApiRequest, NextApiResponse } from 'next';

const validate = (email: string, password: string) => {

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function validateEmail(email: string) {
        return EMAIL_REGEXP.test(email);
    }

     if (validateEmail(email) && password.length >= 6 && password.length <= 9)
        return {
            error: false,
            message: "логин успешен",
        }
     else return {
         error: true,
         message: "логин не успешен",
     }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.status(405).send({ error: true, message: 'Only POST' })
    }
    const { email, password } = req.body;

    // функция для валидации
    const validatedInfo = validate(email, password);
    
    if (validatedInfo.error) {
        res.status(401).send({ error: true,email:email, password:password});
    } else {
        // данные юзера 
        res.status(200).send({
            error: false, name: 'John Smith', mail: email, pass:password,
            about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat,
    ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor
    quis ipsum. Proin mollis pellentesque nulla ac varius.` });

    }
}

// Валидация полей. Поле E-mail должно принимать только электронную почту. Пароль должен состоять из не менее чем 6-9 символов.
// Если данные правильные, то ответ должен вернуть данные об успешной авторизации.
// Если данные неправильные, сервер отвечает 400 статусом.
// Эндпоинт обрабатывает только POST-запросы.