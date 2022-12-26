export type Car = {
  id: string;
  brand: string;
  price: number;
  production_year: number;
  name: string;
};

export interface IsController<T> {
  showById(id: string): Promise<void>;
  add(value: Omit<T, "id">): Promise<void>;
  removeById(id: string): Promise<void>;
  showList(sortQuery: string, offset: number, limit: number): Promise<void>;
}

export interface IsRequester<T> {
  getById(id: string): Promise<T>;
  create(value: Omit<T, "id">): Promise<T>;
  list(sortQuery: string, offset: number, limit: number): Promise<T[]>;
  removeById(id: string): Promise<void>;
}
export interface IsRenderer<T> {
  render(value: T): void;
  renderList(values: T[]): void;
  success(message: string, value?: T): void;
}

export type QueryType =
  | {
      cmd: "create";
      brand: string;
      name: string;
      price: number;
      year: number;
    }
  | {
      cmd: "delete";
      id: string;
    }
  | {
      cmd: "show";
      id: string;
    }
  | {
      cmd: "list";
      sort: string;
      offset: number;
      limit: number;
    };
