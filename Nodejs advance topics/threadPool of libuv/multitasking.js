// process.env.UV_THREADPOOL_SIZE = 4;
// $env:UV_THREADPOOL_SIZE=6;
const fs = require('fs')
const crypto = require('crypto');
const https = require('https')
const start = Date.now();

function doRequest(){
    https.request('https://www.google.co.in/',res=>{
        res.on('data',()=>{});
        res.on('end',()=>{
            console.log('requested',Date.now() - start);
        });
    }).end();
}
function doHash(){
    
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      console.log('hash:', Date.now() - start);
    });
    
}

doRequest()

fs.readFile('multitasking.js','utf8',()=>{
    console.log("fs::", Date.now() - start);
    
})

doHash()
doHash()
doHash()
doHash()


