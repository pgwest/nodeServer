
var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html";
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
    console.log("opening " + ROOT_DIR+urlObj.pathname);
    console.log(urlObj);
    if(urlObj.pathname == "/getcity") {
        console.log("In Rest service");
//        res.writeHead(200);
        var myReg = new RegExp("^" + urlObj.query["q"]);
        var cities = [];
        var jsonResult = [];
        fs.readFile('html/cities.dat.txt', function(err,data){
           if(err){
            res.writeHead(400);
               res.end(JSON.stringify(err));
               console.log("400 error");
               return;
           }
            cities = data.toString().split("\n");
            for(var i=0; i<cities.length; i++){
                var result = cities[i].search(myReg);
                if(result != -1){
                    jsonResult.push({city:cities[i]});   
                }
                console.log(cities[i]);   
            }
            res.writeHead(200);
            res.end(JSON.stringify(jsonResult));
            
//            res.end(JSON.stringify(cities));

        });
    }
    else{
        fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
        console.log("ROOT DIr + urlobj.path = " + ROOT_DIR + urlObj.pathname);
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
    
  });
    }
}).listen(8124);



//var options = {
//    hostname: 'localhost',
//    port: '8080',
//    path: '/index.html'
//  };
//function handleResponse(response) {
//  var serverData = '';
//  response.on('data', function (chunk) {
//    serverData += chunk;
//  });
//  response.on('end', function () {
//    console.log(serverData);
//  });
//}
//http.request(options, function(response){
//  handleResponse(response);
//}).end();