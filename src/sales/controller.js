import { JWT_SECRET } from "../../config/app.js";
import jwt from "jsonwebtoken";
import { BaseController } from "../base/controller.js";
import { PermissionsModel } from "../permissions/model.js";
import { SalesModel } from "./model.js";
import { validatePartialSale, validateSale } from "./schema.js";

const salesModel = new SalesModel();

export class SalesController extends BaseController {
  constructor() {
    super({
      name: "Sale",
      model: salesModel,
      validations: {
        create: validateSale,
        update: validatePartialSale,
      },
    });
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.model.getAll(req.query);
      return res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const auth = req.headers.authorization;
      if (!auth || !auth.startsWith("Bearer "))
        return res.status(401).json({ message: "Token requerido" });

      const token = auth.split(" ")[1];
      const { id } = jwt.verify(token, JWT_SECRET);
      if (!id) return res.status(403).json({ message: "Forbbiden" });

      const hasPermission = await PermissionsModel.hasPermission({
        userId: id,
        permission: "VentasC",
      });
      if (!hasPermission) return res.status(403).json({ message: "Forbbiden" });

      req.body.userId = id;

      const result = this.validations.create(req.body);
      if (!result.success) {
        return res.status(400).json({
          status: "fail",
          data: JSON.parse(result.error.message),
        });
      }

      const newItem = await this.model.create({ input: result.data });
      return res.status(201).json({
        status: "success",
        message: `${this.name} created successfully`,
        data: newItem,
      });
    } catch (err) {
      next(err);
    }
  };
}
