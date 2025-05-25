import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1748213342666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar a tabela "users" com as funcionalidades do TypeORM sem escrever comandos SQL
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Excluir a tabela "users"
        await queryRunner.dropTable("users");
    }

}
