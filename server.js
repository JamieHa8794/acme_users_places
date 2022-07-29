const { Client }= require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgress://localhost/aceme_users_places');

const getUsers = async() =>{
    return (await client.query('SELECT * FROM "user";')).rows;
};

const getPlaces = async() =>{
    return (await client.query('SELECT * FROM "place";')).rows;
};

const syncAndSeed = async ()=>{
    const SQL = `
        DROP TABLE IF EXISTS "user";
        CREATE TABLE "user"(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20) NOT NULL UNIQUE
        );
        INSERT INTO "user"(name) VALUES('moe');
        INSERT INTO "user"(name) VALUES('ethyl');
        INSERT INTO "user"(name) VALUES('lucy');
        INSERT INTO "user"(name) VALUES('curly');
    `
    await client.query(SQL);
}
const init = async () =>{
    try{
        await client.connect();
        await syncAndSeed();
        console.log(await getUsers());
    }
    catch(err){
        console.log(err)
    }
};

init();