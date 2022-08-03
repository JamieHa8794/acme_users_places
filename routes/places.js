const { getUsers, getPlaces } = require('../db')
const app = require('express').Router();

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
            ${head({title: 'Places'})}
            <body>
                ${nav({users, places})}
                <h1>
                Acme Places
                </h1>
                <ul>
                ${places.map(place =>{
                    return(`
                        <li>
                            ${place.name}
                        </li>
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
