const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
  // find all tags  
  const tagData = await Tag.findAll({
  // be sure to include its associated Product data
    include: [
      {model: Product, through: ProductTag}
    ],
    order: [
      ['name', 'ASC']
    ]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
  // find a single tag by its `id`
  const tagData = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
      include: [
        {model: Product, through: ProductTag}
      ]
    });
    res.status(200).json(tagData);
    } catch (error) {
      res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
  try {
  // create a new tag
  const tagData = await Tag.create(req.body);
  res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a tag by its `id
    const tagData = await Tag.update(req.body, {
  // update a tag's name by its `id` value
      where: {
       tag_id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
    } catch (error) {
      res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
  try {
  // delete on tag by its `id` value
  const tagData = await Tag.destroy({
    where: {
     tag_id: req.params.id,
    },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
    } catch (error) {
      res.status(500).json(error);
    }
});

module.exports = router;
