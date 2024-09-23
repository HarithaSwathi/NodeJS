const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../Authorization/Auth")

router.get("/getproducts", auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/addproduct", auth, async (req, res) => {
  const { name, imageUrls, dealPrice, actualPrice, accType, rating } = req.body;
  try {
    const newProduct = new Product({
      name,
      imageUrls,
      dealPrice,
      actualPrice,
      accType,
      rating,
    });

    const product = await newProduct.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/getproduct/:id", auth, async(req,res)=>{
    try{
         const product = await Product.findById(req.params.id)
         res.send(product)

    }catch(e){
        res.status(400).send(e)
    }
})

router.patch("/updateproduct/:id", auth,async(req,res)=>{
    try{
        
        const updatedProduct= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updatedProduct){
            res.status(400).send("product is not present")
        }
        res.send(updatedProduct)

    }catch(e){
       res.status(400).send(e)
    }

})

module.exports = router;
