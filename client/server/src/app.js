//importing external modules
const express = require("express");
const { join } = require("path");

//starting up express
const app = express();

//routing ---
console.log(join(__dirname, "public", "build", "static"));
app.use(express.static(join(__dirname, "public", "build")));
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "public", "build", "index.html"));
});
//end routing ---

//start server on port 3002
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
