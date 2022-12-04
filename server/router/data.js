const express = require("express");
const Category = require("../models/Model");
const Product = require("../models/Product");
const User = require("../models/User");
const router = express.Router();

router.post("/new-category", async (req, res) => {
  const category = new Category(req.body);
  try {
    const category_exit = await Category.findOne({
      category: req.body.category,
    });
    if (!category_exit) {
      category.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ success: err });
        }
      });
      return res.json({
        status: "sucess",
        message: "category created",
      });
    } else {
      return res.json({
        status: "error",
        message: "category already exists",
      });
    }
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});
router.put("/editcategory", async (req, res) => {
  try {
    const category_exit = await Category.findById(req.body.CategoryId);
    category_exit.category = req.body.category;

    category_exit.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: err });
      }
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});
router.post("deletecategory", async (req, res) => {
  const category = Category.findById(req.body.categoryId);
  const index = Category.indexOf(category);
  Category.splice(index, 1);

  try {
    await Category.save();
    res.send(Category);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/new-product", async (req, res) => {
  const product = new Product(req.body);
  try {
    const category_exit = await Category.findOne({
      category: req.body.category,
    });
    category_exit.item.push(product);
    category.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: err });
      }
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});

router.put("/editproduct", async (req, res) => {
  try {
    const category_exit = await Category.findOne({
      category: req.body.category,
    });
    const product = category_exit.item.findById(req.body.productId);
    product.title = req.body.title;

    product.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: err });
      }
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});
router.post("deleteproduct", async (req, res) => {
  const category = Category.findOne({ category: req.body.category });
  const product = category.item.findById(req.body.productId);
  const index = category.item.indexOf(product);
  category.item.splice(index, 1);

  try {
    await category.save();
    res.send(category);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
