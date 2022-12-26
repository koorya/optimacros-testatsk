import { Car, IsController, QueryType } from "./types";

interface QueryExecutor {
  execute(query: QueryType): Promise<void>;
}

export class ClientApp implements QueryExecutor {
  constructor(private _controller: IsController<Car>) {}
  async execute(query: QueryType) {
    if (query["cmd"] == "create") {
      await this._controller.add({
        brand: query["brand"],
        name: query["name"],
        price: query["price"],
        production_year: query["year"],
      });
    } else if (query["cmd"] == "delete") {
      await this._controller.removeById(query["id"]);
    } else if (query["cmd"] == "show") {
      await this._controller.showById(query["id"]);
    } else if (query["cmd"] == "list") {
      await this._controller.showList(
        query["sort"],
        query["offset"],
        query["limit"]
      );
    }
  }
}
