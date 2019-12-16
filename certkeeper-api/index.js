const port = 5000;
var express = require("express");
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.json());


app.get("/test", function (req, res) {
    res.json({data: "Get Request Success"});
});

app.post("/test", function (req, res) {
    res.json({data: "Post Request Success"});
});

app.listen(port, function () {
    console.log(`Server listening on port ${port}!`);
});

