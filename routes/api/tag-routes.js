// Initialize the router
const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// create a new tag
router.post("/", async (req, res) => {
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
    const tagId = req.params.id;
    const updatedTagName = req.body.tag_name;

    // Find the tag to update
    const tagToUpdate = await Tag.findByPk(tagId);

    if (!tagToUpdate) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    // Update the tag_name field
    tagToUpdate.tag_name = updatedTagName;
    await tagToUpdate.save();

    res.status(200).json(tagToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    // delete on tag by its `id` value
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
          res.status(404).json({ message: "No tag found with that id!" });
          return;
        }
    res.status(200).json(deleteTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
