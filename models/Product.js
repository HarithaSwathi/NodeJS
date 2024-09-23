const mongoose= require("mongoose")

const imageSchema = new mongoose.Schema({
    imageUrl:{type:String},
    color: {type:String}
})

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    imageUrls:[imageSchema],
    dealPrice:{type:Number},
    actualPrice:{type:Number},
    accType:{type:String},
    rating:{type:Number}
})

module.exports = mongoose.model("Product", productSchema)
