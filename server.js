const {client, syncAndSeed, getUsers, getPlaces, createUser, deleteUser} = require('./db')
const express = require('express')
const app = express();
const path = require('path')

const { nav, head } = require('./templates')

app.use('/public', express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: false}))
app.use(require('method-override')('_method'))


app.get('/', async (req, res, next)=>{
    try{

        const [users, places] = await Promise.all([
            getUsers(),
            getPlaces(),
        ])
        const HTML = `
            <html>
            ${head({title: 'Acme Home'})}
            <body>
                ${nav({users, places})}
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

app.use('/users', require('./routes/users'))

app.use('/places', require('./routes/places'))

const init = async () =>{
    try{
        await client.connect();
        await syncAndSeed();
        const curly = await createUser({name: 'curly'})
        await deleteUser(curly.id)


        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`))
    }
    catch(err){
        console.log(err)
    }
};

init();