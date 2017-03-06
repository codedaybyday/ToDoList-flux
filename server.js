/**
 * Created by liubeijing on 16/8/10.
 */
var express = require('express');
var app = express();
var fs = require('fs');
var url = require('url');
const ROOT = './';

app.get('/',function (req,res) {
    console.log(req.url);
    //console.log(url.parse(req.url));
    //res.send(fs.readFileSync('index.html'));
    var html = fs.readFileSync(ROOT+'index.html','utf-8');
    //console.log(html);
    res.send(html);
});
/*app.get('/*',function (req,res) {
    console.log(req.url);
    var file_path = ROOT+req.url.substr(1);
    fs.exists(file_path,function(exist){
        if(exist){
            var file = fs.readFileSync(file_path,'utf-8');
            res.send(file);
        }else{
            res.send('404');
        }
    });
});*/
app.listen(1024);