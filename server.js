const {client, syncAndSeed, getUsers, getPlaces, createUser, deleteUser} = require('./db')
const express = require('express')
const app = express();

app.get('/', async (req, res, next)=>{
    try{

        const [users, places] = await Promise.all([
            getUsers(),
            getPlaces(),
        ])
        const HTML = `
            <html>
            <head>
            </head>
            <body>
                <ul>
                    <li>
                    <a href='/'>Home</a>
                    </li>
                    <li>
                    <a href='/Users'>Users (${users.length})</a>
                    </li>
                    <li>
                    <a href='/Places'>Places (${places.length})</a>
                    </li>
                </ul>
                <h1>
                Welcome to Acme Users and Places
                </h1>
            </body>
            </html>
        `
        res.send(HTML)
    }
    catch(err){
        console.log(err)
    }
})



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

        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`))
    }
    catch(err){
        console.log(err)
    }
};

init();