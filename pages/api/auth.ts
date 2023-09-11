import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

const validate = (email: string, password: string) => {

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function validateEmail(email:string) {
  return EMAIL_REGEXP.test(email);
}

if  (validateEmail(email) && password.length>=6 && password.length<=9 ) 
        return {
            error: false,
            message: "логин успешен",            
        }
        else return {
            error: true,
            message: "логин не успешен",            
        }
    }

    if (req.method !== 'GET') {
        res.status(405).send({ error: true, message: 'Only POST' })
    }

    const { email, password } = req.body;

    // Ваша функция для валидации
    const validatedInfo = validate(email, password);

    if (validatedInfo.error) {
        res.status(400).send({ error: true, message: validatedInfo.message });
    } else {
        res.status(200).send({ error: false, token: 'testToken' });
    }
}

// Валидация полей. Поле E-mail должно принимать только электронную почту. Пароль должен состоять из не менее чем 6-9 символов.
// Если данные правильные, то ответ должен вернуть данные об успешной авторизации.
// Если данные неправильные, сервер отвечает 400 статусом.
// Эндпоинт обрабатывает только POST-запросы.