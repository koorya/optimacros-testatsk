import { CarRenderer } from "./app/CarRenderer";
import { ShopController } from "./app/CarShopController";

import { CarShopRecuster } from "./app/Requester";
import { ClientApp } from "./app/ClientApp";
import { Parser } from "./app/Parser";

const main = async () => {
  try {
    const query = Parser.parse();

    const controller = new ShopController(
      new CarShopRecuster(query.url || "http://localhost:5000/carshop"),
      new CarRenderer()
    );
    new ClientApp(controller).execute(query);
  } catch (error) {
    console.log((<Error>error).message);
  }
};
main();
