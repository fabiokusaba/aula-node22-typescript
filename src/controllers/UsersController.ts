// Importar a biblioteca Express
import express, { Request, Response } from 'express';

// Importar a conexão com o banco de dados
import { AppDataSource } from '../data-source';

// Importar a entidade User
import { User } from '../entity/User';

// Criar uma instância do Express para definir as rotas
const router = express.Router();

// Criar a rota para cadastrar o usuário
router.post("/users", async (req: Request, res: Response) => {
    try {
        // Receber os dados enviados no corpo da requisição
        const data = req.body;

        // Criar uma instância do repositório User
        const userRepository = AppDataSource.getRepository(User);

        // Recuperar o registro do banco de dados com o valor da coluna email
        const existingUser = await userRepository.findOne({ where: { email: data.email } });

        // Verificar se já existe usuário cadastrado com esse email
        if (existingUser) {
            res.status(400).json({
                message: "Usuário ja cadastrado com esse email!"
            });
            return;
        }

        // Criar um novo registro
        const newUser = userRepository.create(data);

        // Salvar o registro no banco de dados
        await userRepository.save(newUser);

        // Retornar a resposta de sucesso
        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            user: newUser
        });
    } catch(error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao cadastrar usuário!",
        });
    }
})

// Exportar o router que define todas as rotas da aplicação
export default router;
