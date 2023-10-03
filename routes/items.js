const express = require ("express")
const middleware = require ("../middleware")
const bodyParser = require ("body-parser")
const controller = require ("../controller")

const itemsRoutes = express.Router()

itemsRoutes.use(bodyParser.json()) 

itemsRoutes.get("/", middleware.verifyApiKey, controller.getItems)
    
itemsRoutes.get("/:id", middleware.verifyApiKey, controller.getOneItem)

itemsRoutes.post("/", middleware.verifyApiKey, middleware.verifyAdmin, middleware.verifyItem, controller.postItem)
    
itemsRoutes.put("/:id", middleware.verifyApiKey, middleware.verifyAdmin, controller.updateItem)
    
itemsRoutes.delete("/:id", middleware.verifyApiKey, middleware.verifyAdmin, controller.deleteItem)
    


module.exports = itemsRoutes