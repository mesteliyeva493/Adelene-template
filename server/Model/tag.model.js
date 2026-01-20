const mongoose = require("mongoose");
const tagsSchema = require("../Schemas/tags.schema");

const TagModel = mongoose.model('Tag', tagsSchema);

module.exports = TagModel; 