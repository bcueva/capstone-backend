import { BaseController } from "../base/controller.js";
import { ProductsModel } from "./model.js";
import { validatePartialProduct, validateProduct } from "./schema.js";

const productsModel = new ProductsModel();

export class ProductsController extends BaseController {
  constructor() {
    super({
      name: "Product",
      model: productsModel,
      validations: {
        create: validateProduct,
        update: validatePartialProduct,
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

  getByCode = async (req, res, next) => {
    const { code } = req.params;
    if (!code) {
      return res
        .status(400)
        .json({ status: "fail", message: "Code is required" });
    }

    try {
      const data = await this.model.getByCode({ code });
      return res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  };

  getSuggestions = async (req, res, next) => {
    const { search } = req.query;
    if (!search) {
      return res
        .status(400)
        .json({ status: "fail", message: "Query is required" });
    }

    try {
      const data = await this.model.getSuggestions({ search });
      return res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  }
}
