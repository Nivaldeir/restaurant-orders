export interface ITableService {
  create(data: InputCreateTableDTO): Promise<void>;
  update(data: InputUpdateTableDTO): Promise<void>;
  findAll(): Promise<OutputFindAllTableDTO[]>;
  findById(id: string): Promise<OutputFindAllTableDTO>;
  delete(data: InputDeleteTableDTO): Promise<void>;
}
type Status = "open" | "closed";
export type InputCreateTableDTO = {
  name: string;
};

export type OutputFindAllTableDTO = {
  id: string;
  name: string;
  status: Status;
};
export type InputUpdateTableDTO = {
  id: string;
  name: string;
  status: Status;
};
export type InputDeleteTableDTO = {
  id: string;
};
