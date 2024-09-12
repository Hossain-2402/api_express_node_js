const app = require("../app.js");

const serverless = require('serverless-http');

const router = express();


router.get("/",(res,req)=>{
	res.status(200).json({ message : "Home page" });
});

app.use('/.netlify/functions/index', router); 


module.exports.handler = serverless(app);

