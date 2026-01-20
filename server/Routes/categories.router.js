const express=require("express")
const CategoriesController=require('../Controller/categories.controller')
const category_router=express.Router()

category_router.get('/',CategoriesController.getAll)
category_router.get('/:id',CategoriesController.get)
category_router.put('/:id',CategoriesController.update)
category_router.post('/',CategoriesController.post)
category_router.delete('/:id',CategoriesController.delete)


module.exports = category_router;