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
    const query = `SELECT * FROM sale_detail WHERE sale_id = ?`;
    sale.details = await executeQuery(query, [id]);
    
    return sale;
  }

  async create({ input }) {
    const { companyRuc, userId, details } = input;
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
    };
    const sale = await super.create({ input: saleData });

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

  // async update({ id, input }) {
  //   const { permissions, ...inputItemType } = input;
  //   const sale = await super.update({ id, input: inputItemType });
  //   const connection = await getConnection();

  //   if (permissions) {
  //     const activePermissionIds = Object.keys(permissions).filter(
  //       (key) => permissions[key]
  //     );

  //     const desactivePermissionIds = Object.keys(permissions).filter(
  //       (key) => !permissions[key]
  //     );

  //     try {
  //       for (const permissionId of activePermissionIds) {
  //         await connection.query(
  //           "INSERT IGNORE INTO sale_permission (sale_id, permission_id) VALUES (?, ?);",
  //           [id, permissionId]
  //         );
  //       }

  //       for (const permissionId of desactivePermissionIds) {
  //         await connection.query(
  //           "DELETE FROM sale_permission WHERE sale_id = ? AND permission_id = ?;",
  //           [id, permissionId]
  //         );
  //       }
  //     } finally {
  //       connection.release();
  //     }
  //   }

  //   return this.getById({ id: sale.id });
  // }

  async delete({ id }) {
    const query = `UPDATE ${this.tableName} SET is_deleted = TRUE WHERE id = ?`
    const result = await executeQuery(query, [id])
    return result.affectedRows > 0
  }
}
