const express = require('express');
const router = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../modals/userSchema.js');


router.get("/",(req,res)=>{
	User.find().exec()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(404).json({message : err.message});
	})
});

router.post('/',(req,res,next)=>{
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(req.body.userPassword, salt, function(err, hash) {
			if(err){
				res.status(404).json({ ERROR : err.message });
			}
			else{
				const user = User({
					userId : new mongoose.Types.ObjectId(),
					userEmail : req.body.userEmail,
					userPassword : hash
				});

				user.save()
				.then((result)=>{
					console.log(result)
					res.status(201).json({ message : " New User added ", user : result });
				})
				.catch((err)=>{
					res.status(500).json({ ERROR : err.message });
				});
			}
		});});
});


module.exports = router;


// Sign In : (classNote)
// ----------------
	
	// -npm install --save bcrypt;

	// -similar to products functionality.

	// -router.post('/',(res,req,next)=>{

	// -First we code this: 

		// 	const newUser = User({
		// 		userId : new mongoose.Types.ObjectId(),
		// 		userEmail : req.body.userEmail,
		// 		userPassword : hash
		// 	});
		// 	user.save()
		// 	.then((new_user)=>{
		// 		res.status(201).json({ user : new_user });
		// 	})
		// 	.catch((err)=>{
		// 		res.status(500).json({ message : err.message });
		// 	});

	// -Then we organize the code like this :

		// 	bcrypt.genSalt(10,(err,salt)=>{
		// 		bcrypt.hash(req.body.userPassword, salt,(err,hash)=>{
		// 			if(err){
		// 				res.status(404).json({ ERROR : err.message });
		// 			}
		// 			else{
		// 				const newUser = User({
		// 					userId : new mongoose.Types.ObjectId(),
		// 					userEmail : req.body.userEmail,
		// 					userPassword : hash
		// 				});
		// 				user.save()
		// 				.then((new_user)=>{
		// 					res.status(201).json({ user : new_user });
		// 				})
		// 				.catch((err)=>{
		// 					res.status(500).json({ message : err.message });
		// 				});
		// 			}
		// 		});
		// 	});
		//  });