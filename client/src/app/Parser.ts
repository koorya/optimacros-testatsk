import { ArgumentParser } from "argparse";
import { QueryType } from "./types";

export class Parser {
  private static _parser: ArgumentParser;

  static init() {
    Parser._parser = new ArgumentParser({
      description: "Car shop cli interface",
    });
    Parser._parser.add_argument("--url", {
      help: "server url, default http://localhost:5000/carshop",
    });
    const subparsers = Parser._parser.add_subparsers({
      help: "choose command",
      dest: "cmd",
    });
    const createParser = subparsers.add_parser("create", {
      description: "Create new car",
    });
    const deleteParser = subparsers.add_parser("delete", {
      description: "Remove car by id",
    });
    const showParser = subparsers.add_parser("show", {
      description: "Find car by id",
    });
    const listParser = subparsers.add_parser("list", {
      description: "List cars with sort and pagination",
    });

    createParser.add_argument("--name", { required: true, help: "car name" });
    createParser.add_argument("--brand", { required: true, help: "car brand" });
    createParser.add_argument("--year", {
      required: true,
      help: "production year",
    });
    createParser.add_argument("--price", { required: true, help: "car price" });

    deleteParser.add_argument("--id", { required: true, help: "car id" });
    showParser.add_argument("--id", { required: true, help: "car id" });

    listParser.add_argument("--sort", {
      help: "example name,-price,production_year",
      default: "name",
    });
    listParser.add_argument("--offset", { type: "int", default: 0 });
    listParser.add_argument("--limit", { type: "int", default: 0 });
  }
  static parse(): QueryType & { url?: string } {
    if (!Parser._parser) Parser.init();
    const parsed = Parser._parser.parse_args();
    if (!parsed["cmd"])
      throw Error("Command not specified (list, show, delete, create)");
    return parsed;
  }
}
