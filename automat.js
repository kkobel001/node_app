const arg= process.argv.splice(2);

const name =''
const size=''
const text= `Przygotowuje ${name} o pojemnosci ${size} `

console.log((text.join(arg)));
