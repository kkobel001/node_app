const options={};

const arg= process.argv.splice(2).forEach(x=> {
    const parts = x.split('=');
    options[parts[0]]=parts[1];
});


let drink;
switch (options.name) {
    case 'juice' : drink = 'Sok'; break;
    case 'coffe' : drink = 'Kawę'; break;
    default: drink = 'Napój'
}

const text= `Przygotowuje ${drink} o pojemnosci ${options.size} `;

console.log(text);
