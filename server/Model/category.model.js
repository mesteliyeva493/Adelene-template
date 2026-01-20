const mongoose=require('mongoose')
const categorySchema=require("../Schemas/category.schema")

const CategoryModel=mongoose.model('Category',categorySchema)

module.exports=CategoryModel