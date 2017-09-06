const express = require("express");
const app = express();

const server = app
	.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"))
	.use(express.static("public"))
	.listen(process.env.PORT || 5000, () => {if(!process.env.PORT) console.log(`listening on PORT 5000`)});