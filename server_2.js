const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const process = require('process');
const ejs = require('ejs');
import { router } from './utils/router.js';

let sd = require('silly-datetime');
let md5 = require('md5-node');

let server = http.createServer(function (req, res) {
    
    router(req, res, fs, path, url, 'static');
    // http.get('http://203.156.246.55:2205/ScreenCenter/getScreenData/3_1_6', (res) => {
    //     let rawData = '';
    //     let i=0;
    //     res.on('data', (chunk) => {
    //         console.log('------------------------------------',++i);
    //         rawData += chunk; 
    //     });
    //     res.on('end', () => {
    //         try {
    //           const parsedData = JSON.parse(rawData);
    //           console.log(parsedData);
    //         } catch (e) {
    //           console.error(e.message);
    //         }
    //       });
    // })

}).listen(8080);

// supervisor

