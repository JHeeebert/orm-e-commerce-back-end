// Dependencies
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // find all products
    const products = await Product.findAll({
      // be sure to include its associated Category and Tag data
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // find a single product by its `id`
    const product = await Product.findByPk(req.params.id, {
      // be sure to include its associated Category and Tag data
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ],
    });
    if (!product) {
      res.status(404).json({ message: "No product found with this id." });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      await ProductTag.addTags(req.body.tagIds);
      newProduct.tags = await newProduct.getTags();
    }
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});
// update a product by its `id` value
router.put("/:id", async (req, res) => {
  try {
    // console.log("Request Body:", req.body); // Debugging
    const productId = req.params.id;
    // console.log("Product ID:", productId); // Debugging
    const updatedProduct = await Product.findByPk(productId);
    // console.log("Updated Product:", updatedProduct); // Debugging
    if (!updatedProduct) {
      res.status(404).json({ message: "No product found with this id." });
      return;
    }
    const updatedProductData = req.body;
    await updatedProduct.update(updatedProductData);
    if (req.body.tagIds && req.body.tagIds.length) {
      await updatedProduct.setTag(req.body.tagIds);
      const tags = await updatedProduct.getTag();
      updatedProduct.tag = tags;
    } else {
      updatedProduct.tag = [];
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// delete product
router.delete('/:id', async (req, res) => {
  try {
    // delete one product by its `id` value
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!deleteProduct) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
