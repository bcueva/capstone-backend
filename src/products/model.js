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

  async create ({ input }) {
    input.code = Date.now().toString()
    const keys = Object.keys(input).join(', ')
    const placeholders = Object.keys(input).map(() => '?').join(', ')
    const values = Object.values(input)

    const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`
    const result = await executeQuery(query, values)

    return this.getById({ id: result.insertId })
  }
}
