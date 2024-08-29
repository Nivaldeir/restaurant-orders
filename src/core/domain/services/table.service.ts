import { TableRepository } from "../../app/interfaces/repositories/table.repositorie";
import {
  InputCreateTableDTO,
  InputDeleteTableDTO,
  InputUpdateTableDTO,
  ITableService,
  OutputFindAllTableDTO,
} from "../../app/interfaces/services/table";
import { Table } from "../entitie/table";

export class TableService implements ITableService {
  constructor(private repository: TableRepository) {}
  findById(id: string): Promise<OutputFindAllTableDTO> {
    const table = this.findById(id);
    if (!table) {
      throw new Error("Table not found");
    }
    return table;
  }
  async create(data: InputCreateTableDTO): Promise<void> {
    const table = Table.create(data.name);
    await this.repository.create(table);
  }
  async update(data: InputUpdateTableDTO): Promise<void> {
    const table = await this.repository.findById(data.id);
    if (!table) {
      throw new Error("Table not found");
    }
    await this.repository.update(table);
  }
  async findAll(): Promise<OutputFindAllTableDTO[]> {
    const tables = await this.repository.findAll();
    return tables;
  }
  async delete(data: InputDeleteTableDTO): Promise<void> {
    const table = await this.repository.findById(data.id);
    if (!table) {
      throw new Error("Table not found");
    }
    await this.repository.delete(table.id);
  }
}
