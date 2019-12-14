const port = 5000;
var express = require("express");
var cors = require('cors');
var app = express();

app.use(cors());


app.get("/test3", function (req, res) {
    res.json({data: "Hello World!"});
    console.log("Request received");
});

app.listen(port, function () {
    console.log(`Server listening on port ${port}!`);
});

