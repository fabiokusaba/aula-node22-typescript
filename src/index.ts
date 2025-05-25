// Importar a biblioteca Express
import express, { Request, Response } from 'express';

// Importar o arquivo com as credenciais do banco de dados
import { AppDataSource } from './data-source';

// Criar uma instância do Express
const app = express();

// Inicializar a conexão com o banco de dados
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
    }).catch((error) => {
        console.log(error);
    })

// Definir uma rota simples
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});