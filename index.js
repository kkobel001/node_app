const http= require('http');

function requestListener(req,res) {
    console.log('Ktos wszedl na strone');
    console.log(req.url);

    if (req.url === "/kontakt"){
        res.write('<h1>to jest kontakt</h1>')
        res.end()
    }
    if (req.url === "/"){
        res.write('<h1>to jest strona główna</h1>')
        res.end()
    }
    res.write('<h1>404</h1>')
     return res.end()



    // res.end('Hello node');
}

const serwer = http.createServer(requestListener);

serwer.listen(3000,()=>{
    console.log('Serwer slucha na porcie https:localhost:3000')
});
