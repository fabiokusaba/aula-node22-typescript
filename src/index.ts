// Importar a biblioteca Express
import express, { Request, Response } from 'express';

// Criar uma instância do Express
const app = express();

// Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());

// Incluir as controllers
import UsersController from './controllers/UsersController';

// Criar as rotas de usuários
app.use("", UsersController);    

// Definir uma rota simples
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});