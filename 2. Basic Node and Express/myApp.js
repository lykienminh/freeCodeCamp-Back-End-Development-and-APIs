let express = require('express');
let app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Q11
app.post("/name", (req, res) => {
  // Handle the data in the request
  // var string = req.body.first + " " + req.body.last;
  const { first, last } = req.body;
  const string = first + " " + last;
  res.json({ name: string });
});
// Q9
// app.get("/name", (req, res) => {
//   var { first: firstName, last: lastName } = req.query;
//   res.json({ name: `${firstName} ${lastName}` });
// });
// app.route(path).get(handler).post(handler)
// Q8
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});
// Q7
app.get('/now', (req, _, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({ time: req.time });
});
// Q6
// app.use((req, _, next) => {
//   var string = req.method + " " + req.path + " - " + req.ip;
//   console.log(string)
//   next();
// });
// Q5
// app.get("/json", function(_, res) {
//   if (process.env.MESSAGE_STYLE === "uppercase") {
//     response = "Hello json".toUpperCase();
//   } else {
//     response = "Hello json";
//   }
//   res.json({ message: response });
// });
// Q4
// app.get("/json", function(_, res) {
//  res.json({ message: "Hello json" });
// });
// Q3
// app.use(express.static(__dirname + "/public"));
// Assets at the /public route
// app.use("/public", express.static(__dirname + "/public"));
// app.get("/", function(_, res) {
//   res.sendFile(__dirname + "/views/index.html");
// });
// Q2
// app.get("/", function(_, res) {
//   res.sendFile(__dirname + "/views/index.html");
// });
// Q1
// app.get("/", (_, res) => {
//   res.send("Hello Express");
// });






































 module.exports = app;
