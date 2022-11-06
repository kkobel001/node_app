const app = require('./routes/app');
const {port}=require('./config');




app.listen(port, ()=> {
    console.log(`Aerwer uruchomiony na porcie: ${port}`)
});
