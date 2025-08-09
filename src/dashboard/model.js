import { executeQuery } from "../../db/mysql.js";

export class DashboardModel {
  async getMonthlySales({ date = new Date() }) {
    const year = date.getFullYear();
    const query = `SELECT 
      CONCAT(ELT(MONTH(date), 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'), '-', YEAR(date)) AS month,
      SUM(amount) AS amount
      FROM sale
      WHERE YEAR(date) = ?
      GROUP BY month, YEAR(date), MONTH(date)
      ORDER BY YEAR(date), MONTH(date)`;
    const result = await executeQuery(query, [year]);
    return result;
  }

  async getCumulativeSales({ date = new Date() }) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const query = `CALL get_cumulative_sales(?, ?);`;
    let [result] = await executeQuery(query, [year, month]);
    let esperadasAcu = 0
    result = result.map(obj => {
      const dateObj = new Date(`${year}-${obj.date.split('-').reverse().join('-')}`)
      if(dateObj > date) {
        const esperadas = parseFloat((Math.random() * 500 + 500).toFixed(2))
        esperadasAcu += esperadas
        return { ...obj, esperadas: parseFloat(obj.accumulated) + esperadasAcu }
      }
      return { ...obj }
    })
    return result;
  }

  async getDistributionProducts({ date = new Date() }) {
    const year = date.getFullYear();
    const query = `SELECT p.name AS product, SUM(sd.quantity) AS quantity
      FROM sale_detail sd
      INNER JOIN sale s ON sd.sale_id = s.id AND s.is_deleted = FALSE
      INNER JOIN product p ON sd.product_id = p.id
      WHERE YEAR(s.date) = ?
      GROUP BY p.name
      ORDER BY quantity DESC`;
    const result = await executeQuery(query, [year]);
    return result.map((e) => ({ ...e, quantity: +e.quantity }))
  }
}
