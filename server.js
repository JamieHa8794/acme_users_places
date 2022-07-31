const {client, syncAndSeed, getUsers, getPlaces, createUser, deleteUser} = require('./db')


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