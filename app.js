const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const ejs= require("ejs");
require("dotenv").config();

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("home");
});

app.post("/",function(req,res){
  const city= req.body.city;
  const appid=process.env.APPID;
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units="+ unit;
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData= JSON.parse(data);
      var city = weatherData.name;
      var main= weatherData.weather[0].main;
      var icon = weatherData.weather[0].icon;
      var imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";
      var description = weatherData.weather[0].description;
      var temp = weatherData.main.temp;
     res.render("weather",
        {
          City: city,
          Temperature: temp,
          ImageUrl:imageURL,
          Main: main,
          Description: description

        })
    });
  });
});
// const url="https://api.openweathermap.org/data/2.5/weather?q=tiruchirapalli,in&appid=f3bdad2f9f627812e0bd4cf1e135fb22&units=metric";
// https.get(url,function(response) {
//   console.log(response.statusCode);
//   response.on("data",function(data){
//     const weatherData = JSON.parse(data);
    // var city = weatherData.name;
    // var main= weatherData.weather[0].main;
    // var icon = weatherData.weather[0].icon;
    // var imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";
    // var description = weatherData.weather[0].description;
    // var temp = weatherData.main.temp;
    // res.write("<h1> <center> City: " + city + "</center> </h1>");
    // res.write("<h2> <center> Temperature: " + temp + " C </center> </h2>");
    // res.write("<h3> <center> Weather: " + main + "</center> </h3>");
    // res.write("<center><img src=" + imageURL + "></img></center>")
    // res.write("<p> <center> Description: " + description + "</center> <p>");
    // res.send();
//   });
// });

let port= process.env.PORT;
if (port == null | port==""){
  port=3000;
}
app.listen(port,()=> console.log(" Server is running on port:" + port));
