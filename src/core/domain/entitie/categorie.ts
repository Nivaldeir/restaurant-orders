import { randomUUID } from "crypto";

export type ICategorie = {
  id: string;
  name: string;
};
export class Categorie {
  id: string;
  name: string;
  constructor(props: ICategorie) {
    this.id = props.id;
    this.name = props.name;
  }
  static create(name: string) {
    return new Categorie({
      id: randomUUID(),
      name,
    });
  }
}
