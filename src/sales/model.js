import { executeQuery, getConnection } from "../../db/mysql.js";
import { BaseModel } from "../base/model.js";

export class SalesModel extends BaseModel {
  constructor() {
    super({ tableName: "sale" });
  }

  async getAll() {
    const query = `SELECT s.*, CONCAT_WS(' ', u.name, u.last_name) as name, c.name as company_name
      FROM sale AS s
      LEFT JOIN company AS c ON c.id = s.company_id
      LEFT JOIN user AS u ON u.id = s.user_id
      WHERE is_deleted = 0`;
    const sales = await executeQuery(query);
    sales.forEach((sale) => {
      sale.permissions = sale.permissions?.split(",").reduce((obj, item) => {
        obj[item] = true;
        return obj;
      }, {});
    });
    return sales;
  }

  async getById({ id }) {
    const sale = await super.getById({ id: id });
    const query = `SELECT * FROM sale_detail sd
      INNER JOIN product p ON p.id = sd.product_id
      WHERE sale_id = ?`;
    sale.details = await executeQuery(query, [id]);
    sale.table = await executeQuery(
      "SELECT id, number FROM tables WHERE id = ?",
      [sale.table_id]
    );

    return sale;
  }

  async create({ input }) {
    const { companyRuc, userId, tableId, payType, details } = input;
    const connection = await getConnection();

    const [[company]] = await connection.execute(
      "SELECT * FROM company WHERE ruc = ?",
      [companyRuc]
    );

    let total = details.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );

    total = parseFloat(total.toFixed(2));

    const saleData = {
      date: new Date(),
      amount: total,
      user_id: userId,
      company_id: company.id,
      table_id: tableId,
      pay_type: payType
    };
    const sale = await super.create({ input: saleData });

    await connection.execute(
      "UPDATE tables SET is_available = FALSE WHERE id = ?",
      [tableId]
    );

    try {
      for (const detail of details) {
        const { id, quantity, price, observation } = detail;
        await connection.query(
          "INSERT INTO sale_detail (sale_id, price, quantity, observation, product_id) VALUES (?, ?, ?, ?, ?);",
          [sale.id, price, quantity, observation, id]
        );
      }
    } finally {
      connection.release();
    }

    return this.getById({ id: sale.id });
  }

  async update({ id: saleId, input }) {
    const { details, endSale, payType, tableId } = input;
    const connection = await getConnection();

    let total = details.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );

    total = parseFloat(total.toFixed(2));

    const saleData = {
      date: new Date(),
      amount: total,
      pay_type: payType
    };
    await super.update({ id: saleId, input: saleData });
    await connection.query("DELETE FROM sale_detail WHERE sale_id = ?;", [saleId]);
    if(endSale) {
      await connection.query("UPDATE tables SET is_available = TRUE WHERE id = ?;", [tableId]);
      await connection.query("UPDATE sale SET paid = TRUE WHERE id = ?;", [saleId]);
    }

    try {
      for (const detail of details) {
        const { id, quantity, price, observation } = detail;
        await connection.query(
          "INSERT INTO sale_detail (sale_id, price, quantity, observation, product_id) VALUES (?, ?, ?, ?, ?);",
          [saleId, price, quantity, observation, id]
        );
      }
    } finally {
      connection.release();
    }

    return this.getById({ id: saleId });
  }

  async delete({ id }) {
    const query = `UPDATE ${this.tableName} SET is_deleted = TRUE WHERE id = ?`;
    const result = await executeQuery(query, [id]);
    return result.affectedRows > 0;
  }
}
