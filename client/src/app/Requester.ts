import { Car, IsRequester } from "./types";

enum Routes {
  create,
  remove,
  list,
  get,
}

export abstract class Requester<T> implements IsRequester<T> {
  constructor(private _baseurl: string) {}
  async getById(id: string) {
    const value = await fetch(this.getUrl(Routes.get, id)).then(
      (r) => r.json() as Promise<T>
    );
    return value;
  }
  async create(value: Omit<T, "id">) {
    const new_value = await fetch(this.getUrl(Routes.create), {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(value),
    }).then((r) => r.json() as Promise<{ [key: string]: string }>);
    return { ...value, id: new_value[0] } as unknown as T;
  }
  async list(sortQuery: string, offset: number, limit: number) {
    return await fetch(
      this.getUrl(
        Routes.list,
        `?sort=${sortQuery}&offset=${offset}&limit=${limit}`
      )
    ).then((r) => r.json() as Promise<T[]>);
  }
  async removeById(id: string) {
    await fetch(this.getUrl(Routes.remove, id), { method: "delete" });
  }
  getUrl(route: Routes, args?: string) {
    return `${this._baseurl}/${this.transformRoute(route)}${
      args ? `/${args}` : ""
    }`;
  }
  abstract transformRoute(route: Routes): string;
}
export class CarShopRecuster extends Requester<Car> {
  transformRoute(route: Routes): string {
    if (route == Routes.create) {
      return "car";
    }
    return "cars";
  }
}
