const TagModel = require("../Model/tag.model");

const TagsController = {

getAll: async (req, res) => {
    try {
        const target = await TagModel.find().populate("products"); 
        res.status(200).send(target);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
},
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const found = await TagModel.findById(id);
      res.status(200).send(found);
    } catch (error) {
      res.status(500).send("Tapılmadı və ya xəta");
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await TagModel.findByIdAndDelete(id);
      res.status(200).send(deleted);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  post: async (req, res) => {
    try {
      const { title } = req.body;
      const newTag = new TagModel({ title });
      await newTag.save();
      res.status(201).send(newTag);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTag = await TagModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res.status(200).send(updatedTag);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = TagsController;
