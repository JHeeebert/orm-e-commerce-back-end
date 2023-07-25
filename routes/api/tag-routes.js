// Initialize the router
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  try {
    // find all tags  
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [
        { model: Product, through: ProductTag }
      ],
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
        { model: Product, through: ProductTag }
      ]
    });
    res.status(200).json(tagData);
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// create a new tag
router.post('/', async (req, res) => {
  try {
    // create a new tag
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    res.status(400).json(error);
  }
});
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // update a tag by its `id
    const updatedTag = await Tag.update(
// Update the tag_name field with the data from req.body
      { tag_name: req.body.tag_name },
// Update the tag with the matching id using the req.params.id
      { where: { tag_id: req.params.id } }
    );
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: {
        tag_id: req.params.id,
      },
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
