let http = require('http');
let fs = require('fs');
let path = require('path');

// let getMine = require('./utils/tools.js');
import { getMine } from './utils/tools.js';
let sd = require('silly-datetime');
let md5 = require('md5-node');

let server = http.createServer(function (req, res) {

    let pathName = req.url;
    if(pathName == '/favicon.ico'){
        return;
    }else{
        // console.log()
        // 【1】
        // format(new Date(), 'YYYY-MM-DD HH:mm'); // 2015-07-06 15:10
        // fromNow(+new Date() - 2000); // a few seconds ago
        // let d = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
        // let str2 = md5('hello world');

        let extname = path.extname(pathName);
        res.writeHead(200, { 'Content-Type': `${getMine(extname)};charset=utf-8` });

        fs.readFile(`./static${pathName}`,function(err,data){
            
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            
            if(err){

                fs.readFile('./static/404.html',function(err2,data2){
                    if(err2){
                        console.log('404文件读取错误')
                    }else{
                        // path.extname('/index.css')
                        res.write(data2);
                        res.end();
                    }
                })

            }else{
                
                res.write(data);
                res.end();
            }
           
        });
        
    }

}).listen(8080);

// supervisor

