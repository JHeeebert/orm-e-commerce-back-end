const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const updateCategoryData = await Category.update(req.body, {
      where: {
        category_id: req.params.id,
      },
    });
    if (!updateCategoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(updateCategoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const deleteCategoryData = await Category.destroy({
      where: {
        category_id: req.params.id,
      },
    });
    if (!deleteCategoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(deleteCategoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
