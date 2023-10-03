const fs = require ("fs")

/**
 * a function to get one item
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getOneItem = (req, res)=>{
    const fileDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(fileDB)

    const id = req.params.id

    const itemToFind = items.find((item)=>{
        return item.id == parseInt(id)
    })

    if(!itemToFind){
        res.status(404).send(`Item not found`)
        return
    }
    res.status(200).json(itemToFind)
}

/**
 * function to post an item
 * @param {*} req 
 * @param {*} res 
 */
const postItem = (req, res)=>{
    const fileDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(fileDB)

    const toPost = req.body

    const lastId = items[items.length-1].id
    const newId = lastId + 1;

    const postWithId = {...toPost, id:newId}
    items.push(postWithId)
    fs.writeFile("./db/items.json", JSON.stringify(items), (err)=>{
        if(err){
            res.status(404)
        }
        res.status(200).json(postWithId)
    } )
}

/**
 * func to get all items in the db
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getItems = (req, res)=>{
    const allItems = fs.readFileSync("./db/items.json")
   return res.status(200).send(allItems)
}

/**
 * a func that deletes existing items
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteItem = (req, res)=>{
    const fileDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(fileDB)

    const id = req.params.id

    const indexTOUpdate = items.findIndex(item=> item.id == parseInt(id))
    if(indexTOUpdate== -1){
        res.status(404).send(`item with id ${id} not found`)
        return
    }else{items.splice(indexTOUpdate, 1)}
    
    fs.writeFile("./db/items.json", JSON.stringify(items), (err)=>{
        if(err){
            res.status(500).send("internal server error")
            return
        }
        res.status(200).send(`item with id: ${id} successfully deleted`)
    } )
}


/**
 * func to update existing items
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req, res)=>{
    const fileDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(fileDB)

    const update = req.body

    const id = req.params.id

    const indexTOUpdate = items.findIndex(item=>item.id == parseInt(id))
    if(indexTOUpdate==-1){
        res.status(404)
        res.end("id not found") 
    }
    items[indexTOUpdate] = {...items[indexTOUpdate], ...update}

    fs.writeFile("./db/items.json", JSON.stringify(items), (err)=>{
        if(err){
            res.status(500)
            res.end("error while updating")

        }
        res.json(items[indexTOUpdate])
    } )
   
}


module.exports = {
    postItem,
    updateItem,
    deleteItem,
    getItems,
    getOneItem,
}
