import { randomUUID } from "crypto";

type Status = "open" | "closed";
export type ITable = {
  id: string;
  name: string;
  status: Status;
};
export class Table {
  id: string;
  name: string;
  status: Status;
  constructor(props: ITable) {
    this.id = props.id;
    this.name = props.name;
    this.status = props.status;
  }
  static create(name: string) {
    return new Table({
      id: randomUUID(),
      name,
      status: "open",
    });
  }

  setStatus(status: Status) {
    this.status = status;
  }
}
