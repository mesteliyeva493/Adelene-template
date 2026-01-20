const express = require("express");
const TagsController = require("../Controller/tags.controller");
const tag_router = express.Router();

tag_router.get("/", TagsController.getAll);
tag_router.get("/:id", TagsController.get);
tag_router.put("/:id", TagsController.update);
tag_router.post("/", TagsController.post);
tag_router.delete("/:id", TagsController.delete);

module.exports = tag_router;
