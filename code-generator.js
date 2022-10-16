const arg = process.argv.splice(2);


const getParams=(args) =>{
    const params={};
    arg.splice(2).forEach(x => {
        const parts= x.split('=');
        params[parts[0]]= parts[1].split(',');
    })
    return params;

}
const generateClass = (name,params) => {
    let code;
    code += `class ${name} {\n` ;
    params.methods.forEach|(method => {
        code += `\t${method}(${name.toLowerCase()} {})\n`
    });
    code += `}`;
    return code
}

const type=arg[0].split(':')[1];
const name=arg[1];
const params=getParams(arg);

let code;
if (type === 'class') {
    code= generateClass(name,params);
    } 

console.log(code);
