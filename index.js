
const add = require('./math');
const sayHi =(name='') => {

    const args = process.argv.splice(2)
    for( const a of args){
       const arr = a.split('=');
       if (arr[0]=== '--name') {
        name=arr[1];
    }
    }
   
    console.log(`Cześc ${name}`);

}


sayHi();




