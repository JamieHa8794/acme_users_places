
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

module.exports = {
    nav,
    head
}