const mongoose = require("mongoose");

const categorySchema=new mongoose.Schema(
{
    title:String,
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
},
{timestamps:true,}



)

module.exports=categorySchema;