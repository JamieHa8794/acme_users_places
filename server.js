const { Client }= require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgress://localhost/aceme_users_places');


const syncAndSeed = async ()=>{
    const SQL = `
        DROP TABLE IF EXISTS "user";
        CREATE TABLE "user"(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20) NOT NULL UNIQUE
        );
        INSERT INTO "user"(name) VALUES('moe');
    `
    await client.query(SQL);
}
const init = async () =>{
    try{
        await client.connect();
        await syncAndSeed()
    }
    catch(err){
        console.log(err)
    }
};

init();