import { PrismaClient } from "@prisma/client";
import { TableRepository } from "../../../../core/app/interfaces/repositories/table.repositorie";
import { Table } from "../../../../core/domain/entitie/table";

export class TableDatabase implements TableRepository {
  constructor(private readonly db: PrismaClient) {}
  async findAll(): Promise<Table[]> {
    const tables = await this.db.table.findMany();
    return tables.map(
      (table) =>
        new Table({
          id: table.id,
          name: table.name,
          status: table.status as "open" | "closed",
        })
    );
  }
  async findById(id: string): Promise<Table> {
    const table = await this.db.table.findFirst({
      where: {
        id,
      },
    });
    if (!table) {
      throw new Error("Table not found");
    }
    return new Table({
      id: table.id,
      name: table.name,
      status: table.status as "open" | "closed",
    });
  }
  async create(table: Table): Promise<void> {
    await this.db.table.create({
      data: {
        name: table.name,
        status: table.status,
        id: table.id,
      },
    });
  }
  update(table: Table): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    await this.db.table.delete({
      where: {
        id,
      },
    });
  }
}
