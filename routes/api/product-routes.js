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
// update product
router.put('/:id', async (req, res) => {
  // update product data
try {
  const updatedProduct = await Product.update(req.body, {
    where: {
          product_id: req.params.id,
        },
      });
      // find all associated tags from ProductTag
      const productTag = await ProductTag.findAll({ where: { product_id: req.params.id } });
      // get list of current tag_ids
      const productTagId = productTag.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTag = req.body.tagId
        .filter((tag_id) => !productTagId.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagToRemove = productTag
        .filter(({ tag_id }) => !req.body.tagId.includes(tag_id))
        .map(({ product_tag_id }) => product_tag_id);
      // run both actions
      const updatedProductTag = await Promise.all([
        ProductTag.destroy({ where: { product_tag_id: productTagToRemove } }),
        ProductTag.bulkCreate(newProductTag),
      ]);
      res.status(200).json(updatedProductTag);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
router.delete('/:id', async (req, res) => {
  try {
    // delete one product by its `id` value
    const deleteProduct = await Product.destroy({
      where: {
        product_id: req.params.id,
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
