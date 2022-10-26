const { waitForDebugger } = require('inspector');
const {MongoClient} = require('mongodb');

const url ='mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName='node-project';
const db=client.db(dbName);

async function main() {  
    await client.connect();
    console.log('połączenie udane !');

    //collection companies
   await client
        .db(dbName)
        .collection('companies')
        .findOne({slug: 'meble' });
}

main()
    .catch(e => console.log('Something went wrong '));