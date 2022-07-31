const { Client }= require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgress://localhost/aceme_users_places');

const getUsers = async() =>{
    return (await client.query('SELECT * FROM "user";')).rows;
};

const getPlaces = async() =>{
    return (await client.query('SELECT * FROM "place";')).rows;
};

const createUser = async({ name }) =>{
    return (await client.query('INSERT INTO "user"(name) VALUES($1) RETURNING *;', [name])).rows[0];
}

const deleteUser = async (id) =>{
    await client.query('DELETE FROM "user" WHERE id=$1', [id])
}
const syncAndSeed = async ()=>{
    const SQL = `
        DROP TABLE IF EXISTS "user";
        DROP TABLE IF EXISTS "place";
        CREATE TABLE "user"(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20) NOT NULL UNIQUE
        );
        CREATE TABLE "place"(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20) NOT NULL UNIQUE
        );
        INSERT INTO "user"(name) VALUES('moe');
        INSERT INTO "user"(name) VALUES('ethyl');
        INSERT INTO "user"(name) VALUES('lucy');
        INSERT INTO "place"(name) VALUES('NYC');
        INSERT INTO "place"(name) VALUES('Chicago');
        INSERT INTO "place"(name) VALUES('Houston');
    `
    await client.query(SQL);
}
const init = async () =>{
    try{
        await client.connect();
        await syncAndSeed();
        const curly = await createUser({name: 'curly'})
        console.log(curly)
        console.log(await getUsers());
        console.log(await getPlaces());
        await deleteUser(curly.id)
        console.log(await getUsers());
    }
    catch(err){
        console.log(err)
    }
};

init();