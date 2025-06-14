// Importar a biblioteca Express
import express, { Request, Response } from 'express';

// Importar a conexão com o banco de dados
import { AppDataSource } from '../data-source';

// Importar a entidade User
import { User } from '../entity/User';

// Importar o Not para utilizar como restrição para ignorar o próprio ID na consulta
import { Not } from 'typeorm';

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
        return;
        
    } catch(error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao cadastrar usuário!",
        });
        return;
    }
});

// Criar a rota para listar os usuários
router.get("/users", async (req: Request, res: Response) => {
    try {
        // Criar uma instância do repositório de User
        const userRepository = AppDataSource.getRepository(User);

        // Recuperar todos os usuários do banco de dados
        const users = await userRepository.find();

        // Retornar os usuários como resposta
        res.status(200).json({
            message: "Usuários listados com sucesso!",
            users: users
        });
        return;

    } catch(error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao listar usuários!",
        });
        return;
    }
});

// Criar a rota para visualizar um usuário específico
router.get("/users/:id", async (req: Request, res: Response) => {
    try {
        // Obter o ID do usuário a partir dos parâmetros da requisição
        const id = parseInt(req.params.id);

        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({ id: id });

        // Verificar se o usuário foi encontrado
        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado!"
            });
            return;
        }

        // Retornar o usuário como resposta
        res.status(200).json({
            message: "Usuário visualizado com sucesso!",
            user: user
        });
        return;

    } catch(error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao visualizar usuário!",
        });
        return;
    }
});

// Criar a rota para editar um usuário
router.put("/users/:id", async (req: Request, res: Response) => {
    try {
        // Obter o ID do usuário a partir dos parâmetros da requisição
        const id = parseInt(req.params.id);

        // Receber os dados enviados no corpo da requisição
        const data = req.body;

        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({ id: id });

        // Verificar se o usuário foi encontrado
        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado!"
            });
            return;
        }

        // Verificar se já existe outro usuário com o mesmo email, mas que não seja o registro atual
        const existingUser = await userRepository.findOne({ 
            where: { 
                email: data.email, 
                id: Not(id) // Exclui o próprio registro da busca
            } 
        });

        // Verifica se o usuário foi encontrado
        if (existingUser) {
            res.status(400).json({
                message: "Já existe um usuário cadastrado com esse email!"
            });
            return;
        }

        // Atualizar os dados do usuário
        userRepository.merge(user, data);

        // Salvar as alterações no banco de dados
        const updatedUser = await userRepository.save(user);

        // Retornar a resposta de sucesso
        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: updatedUser
        });
        return;

    } catch(error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao editar usuário!",
        });
        return;
    }
});

// Criar a rota para apagar um usuário
router.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        // Obter o ID do usuário a partir dos parâmetros da requisição
        const id = parseInt(req.params.id);

        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({ id: id });

        // Verificar se o usuário foi encontrado
        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado!"
            });
            return;
        }

        // Remover o usuário do banco de dados
        await userRepository.remove(user);

        // Retornar a resposta de sucesso
        res.status(200).json({
            message: "Usuário apagado com sucesso!"
        });
        return;

    } catch(error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao apagar usuário!",
        });
        return;
    }
});

// Exportar o router que define todas as rotas da aplicação
export default router;
