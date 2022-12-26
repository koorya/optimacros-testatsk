import { IsController, IsRenderer, IsRequester } from "./types";

export class ShopController<T> implements IsController<T> {
  constructor(
    private _requester: IsRequester<T>,
    private _render: IsRenderer<T>
  ) {}
  async showById(id: string) {
    const value = await this._requester.getById(id);
    this._render.render(value);
  }
  async add(value: Omit<T, "id">) {
    const valueWithId = await this._requester.create(value);
    this._render.success("Creation", valueWithId);
  }
  async removeById(id: string) {
    await this._requester.removeById(id);
    this._render.success("Deleting");
  }
  async showList(sortQuery: string, offset: number, limit: number) {
    const list = await this._requester.list(sortQuery, offset, limit);
    this._render.renderList(list);
  }
}
