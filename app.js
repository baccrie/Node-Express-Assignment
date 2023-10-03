const express = require ('express')

const itemsRoute = require ("./routes/items.js") 
const usersRoute = require ("./users/routes.js")


const app = express()
const PORT = 4000

app.use("/items", itemsRoute)
app.use("/users", usersRoute)



app.listen(PORT, ()=>{
    console.log(`app is running at http://localhost:${PORT}`)
})