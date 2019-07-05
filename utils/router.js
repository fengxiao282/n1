// 静态文件托管服务(路由分发)
import {mineType} from './mime.js'

function getMine(extname){
  return mineType[extname] || 'text/html';
}

let dir = __dirname;

function getMine2(extname,fs,path){
  let pt = path.join(dir,"./mime.json")
  let data = fs.readFileSync(pt);
  let Mimes=JSON.parse(data.toString());
  return Mimes[extname] || 'text/html';
}

function router(req, res, fs, path, url, staticDir){
  let pathname = url.parse(req.url).pathname;
  let method = req.method;
  if(pathname == '/favicon.ico'){
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.end();
  }else{
      console.log('------pathname-----',pathname)
      if(pathname == '/'){
          pathname = '/login.html';

      }else if(pathname == '/index.html'){
        let rawData = '';
        let i=0;
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        req.on('end', () => {
            try {
              console.log(rawData.toString());
            } catch (e) {
              console.error(e.message);
            }
          });

    }
  
      let extname = path.extname(pathname);
      let pt = path.join(dir,`../${staticDir}`)
      fs.readFile(`${pt}${pathname}`,function(err,data){
  
          res.writeHead(200, { 'Content-Type': `${getMine(extname,fs,path)};charset=utf-8` });
          
          if(err){
  
              fs.readFile(`${pt}/404.html`,function(err2,data2){
                  if(err2){
                      console.log('404文件读取错误')
                  }else{
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
}

export{
  router
}
