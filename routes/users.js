const { getUsers, getPlaces, createUser, deleteUser} = require('../db')
const app = require('express').Router()

module.exports = app;


const nav = ({users, places}) =>{
    return(`
        <nav>
            <a href='/'>Home</a>
            <a href='/Users'>Users (${users.length})</a>
            <a href='/Places'>Places (${places.length})</a>
        </nav>
    `)
}

const head = ({title})=>{
    return(`
        <head>
            <link rel='stylesheet' href='/public/styles.css'/>
            <title>${title}</title>
        </head>
    `)
}


app.get('/', async(req, res, next)=>{
    try{
        const [users, places] = await Promise.all([
            getUsers(),
            getPlaces(),
        ])
        const HTML = `
            <html>
            ${head({title: 'Users'})}
            <body>
                ${nav({users, places})}

                <h1>
                    Acme Users
                </h1>
                <form method='POST'>
                    <input name='name'/>
                    <button>Add User</button>
                </form>
                <ul>
                ${users.map(user =>{
                    return(`
                        <li>
                            ${user.name}
                        </li>
                        <form method='POST' action='/users/${user.id}?_method=DELETE'>
                        <button>x</button>
                        </form>
                    `)
                }).join('')}
                </ul>
            </body>
            </html>
        `
        res.send(HTML)


    }
    catch(err){
       next(err)
    }
})

app.post('/', async (req, res, next)=>{
    const user = req.body;
    try{
        await createUser(user)
        res.redirect('/users')
    }
    catch(err){
        next(err)
    }
})

app.delete('/:id', async(req, res, next)=>{
    try{
        await deleteUser(req.params.id)
        res.redirect('/users')
    }
    catch(err){
        next(err)
    }
})

