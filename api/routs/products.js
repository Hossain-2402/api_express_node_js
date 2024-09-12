const express = require("express");
const router = express();
const mongoose = require('mongoose');
const multer = require("multer");
// const uploadsFolder = multer({ dest: "uploads/" });
const myStorage = multer.diskStorage({
	destination : function(req,file,callback){
		callback(null, "./uploads/");
	} ,
	filename : function(req,file,callback){
		callback(null, file.originalname );
	},
});
const uploadsFolder = multer({ storage: myStorage});


const Product = require('../modals/productSchema'); 


router.get("/",(req,res)=>{
	Product.find().exec()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(404).json({message : err.message});
	})
});


router.get("/:productId", (req, res) => {

    const productId = req.params.productId;
    Product.findById(productId).exec()
    .then((result)=>{	
    	if(result){
		    res.status(200).json({
		        message: "Product found",
		        product: result
			});    	
    	}else{
		    res.status(404).json({
		        message: "Product Not found"
			});
    	}
    })
    .catch(err=>{
	    res.status(500).json({
	        message: "Invalid Product"
		});

    })
});

router.post("/", uploadsFolder.single("productImage") ,(req,res,next)=>{
	console.log(req.file.path);
	const product = new Product({
		_id : new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage : "localhost:3000/" + req.file.path
	});

	product.save()
	.then((result) => {
	  console.log(result);
	  res.status(201).json({
	    message: "Product created successfully",
	    product : result
	  });
	})
	.catch((err) => { 
	  console.log("MAMA mara khaisi : " , err);
	  res.status(500).json({
	    message: "The mara is : " + err.message
	  });
	});
});

router.delete("/:productId", (req, res) => {
    const productId = req.params.productId;
	const deleted_product = Product.findById(productId);

    Product.findByIdAndDelete(productId).exec()
	.then((result)=>{
		if(result){
			res.status(200).json({ message : "Removed " +  deleted_product })
		}else{
			res.status(500).json({ message : "Could not find " +  deleted_product })
		}
	})
	.catch((err)=>{
		res.status(404).json({ message : err.message })
	});
});

router.patch("/:productId", async (req, res) => {
	const productId = req.params.productId;
	const updateOps = {};
	for(const ops of req.body){
		updateOps[ops.new_name] = ops.new_value;
	}

    try {
        // First find if the product exists or not 
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updateOps },
            { new: true } // new: true returns the updated document
        );
        // product Does not exist
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // product exists

        res.status(201).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;



// Adding an Image : (classNote)
// ----------------
		// npm install --save multer

		// const multer = require('multer');

		// const myStorage = multer.diskStorage({
		// 	destination : function(req,file,callBack){
		// 		callBack(null, "./uploads/");
		// 	},
		// 	filename : function(req,file,callBack){
		// 		callBack(null, file.originalname );
		// 	} 
		// });

		// const uploads = multer({ storage : myStorage });


		// router.post("/", uploads.single("productImage") , (req,res,next)=>{ 	// "productImage" : The key for the productImage link string 
		// 	console.log(req.file.originalname);
		// 	productImage : req.file.productImage // JSON for productImage 
		// });