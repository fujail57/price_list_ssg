import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";

export const get_products = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const get_product = async (req, res) => {
  try {
    const product_id = req.params.id;
    const product = await prisma.product.findFirst({
      where: {
        id: Number(product_id)
      }
    })
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export const create_product = async (req, res) => {
  try {
    const { name, description, sku, basePrice, isVariable, categoryId } =
      req.body;
    const new_product = await prisma.product.create({
      data: {
        categoryId: Number(categoryId),
        name,
        description,
        sku,
        basePrice: new Prisma.Decimal(basePrice),
        isVariable,
      },
    });
    return res.status(201).json({
      success: true,
      data: new_product,
      message: "New product created",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const update_product = async (req, res) => {
  try {
    const product_id = req.params.id;
    const { name, description, sku, basePrice, isVariable, categoryId } =
      req.body;
    const updated_product = await prisma.product.update({
      where: {
        id: Number(product_id)
      },
      data: {
        categoryId: Number(categoryId),
        name,
        description,
        sku,
        basePrice: new Prisma.Decimal(basePrice),
        isVariable,
      },
    });
    return res.status(201).json({
      success: true,
      data: update_product,
      message: "Product updated",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


export const delete_product = async (req, res) => {
  try {
    const product_id = req.params.id;
    await prisma.product.delete({
      where: {
        id: Number(product_id)
      }
    })
    return res.status(200).json({ success: true, message: `Product with id ${product_id} has been deleted` })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
}