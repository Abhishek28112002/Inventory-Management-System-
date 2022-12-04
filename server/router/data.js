const express = require("express");
const Category = require("../models/Model");
const Product = require("../models/Product");
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
        return res.json({
          status: "sucess",
          message: "category created",
          data: category
        });
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
router.post("/editcategory", async (req, res) => {
  try {
    const category_exit = await Category.findById(req.body.categoryId);
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
router.delete("/deletecategory", async (req, res) => {
  const category = Category.findOneAndDelete({categoryId:req.body.categoryId},
  (err, result) => {
    if (err) return res.send(500, err)
    console.log('got deleted');
    res.redirect('/');
    });
});

router.post("/new-product", async (req, res) => {
  const product = new Product(req.body);
  try {
    let category_exit = await Category.findOne({
      categoryId: req.body.categoryId,
    });
    if(!category_exit){
       category_exit = new Category({
        category: req.body.category
      })
      category_exit.save();
    }
    category_exit.item.push(product);
    category_exit.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: err });
      }
      else
      {
        return res.status(200).json({ success:category_exit})
      }
    });
  } catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});

router.post("/editproduct", async (req, res) => {
  try {
    const category= await Category.findOne({
      category: req.body.category})
    await  category.item.findByIdAndUpdate(req.body.productId,
    {title :req.body.title})
    res.json({
      status: "SUCCESS",
      message: category
    });
  }
 catch (err) {
    res.json({
      status: "ERROR",
      message: err.message,
    });
  }
});
router.delete("deleteproduct", async (req, res) => {
  const category = Category.findOne({ category: req.body.category });
  const product = category.item.findByIdAndDelete(req.body.productId,
    (err, result) => {
      if (err) return res.send(500, err)
      console.log('got deleted');
      res.redirect('/');
      });
});

module.exports = router;
