var express = require("express");
var cookieParser = require("cookie-parser"); 
var app = express();
var port = 1337;
var bodyParser = require('body-parser');
// Tao mot parser co dang application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());
app.use(express.static('public')); // chi se cho nguoi dung thu muc public co the truy cap dk 

// custome middlware 

app.use("/", function(req, res, next) { //  casi nay de kiem tra khi moi cai req den thi minh se log ra no thoi gian la bao nhieu
    console.log("Request URL:", req.url);
    req.requestTime = new Date();
    next(); // ham nay de cho phep cac middlware khac co the chay
});

// cai dat middlware
app.use("/assets", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    console.log('Cookies: ', req.cookies);
    res.send(`
        <link href="/assets/style.css" rel="stylesheet" type="text/css">
        <h1>Hello node anh my js</h1>
        <p> Request: ${ req.requestTime }</p>
    `);
});

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});

app.post('/process_post', urlencodedParser, function (req, res) {
    // Chuan bi output trong dinh dang JSON
    response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

app.get("/api", function (req, res) {
    res.json({
        firstName: "tranvan",
        lastName: "my "
    });
});

// user 123
app.get("/users/:userId", function (req, res) {
    res.cookie("username", req.params.id);
    res.send(`<h1>User:${ req.params.userId }</h1>`);
});

app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
});

// Phuong thuc post() phan hoi mot POST Request ve Homepage
app.get('/111', function (req, res) {
    console.log("Nhan mot POST Request ve Homepage");
    res.send('Hello POST');
 })

app.listen(port, function() {
    console.log("server is listenin1g in Port:", port);
});