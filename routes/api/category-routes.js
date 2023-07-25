// Dependencies
const router = require('express').Router();
const { Category, Product } = require('../../models');
// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll({
      // be sure to include its associated Products
      include: [Product],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "TRY AGAIN" });
  }
});
// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [Product],
    });
    if (!category) {
      res.status(404).json({ message: 'No Category Found With That id!' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "TRY AGAIN" });
  }
});
// create a new category
router.post('/', async (req, res) => {
  try {
    // create a new category
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json({message: "New Category Not Created"});
  }
});
// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Export the router
module.exports = router;
