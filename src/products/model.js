import { BaseModel } from "../base/model.js";
import { executeQuery } from "../../db/mysql.js";

export class ProductsModel extends BaseModel {
  constructor() {
    super({ tableName: "product" });
  }

  async getByCode({ code }) {
    const query = `SELECT * FROM ${this.tableName} WHERE code = ? LIMIT 1`;
    const [row] = await executeQuery(query, [code]);
    return row || null;
  }

  async getSuggestions({ search }) {
    const query = `SELECT * FROM ${this.tableName} WHERE code LIKE ? OR LOWER(name) LIKE LOWER(?)`;
    const rows = await executeQuery(query, [`%${search}%`, `%${search}%`]);
    return rows;
  }
}
