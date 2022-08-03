const { getUsers, getPlaces } = require('../db')
const app = require('express').Router();

const { nav, head } = require('../templates')

module.exports = app;



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
