const fs = require ("fs")

const createUser = (req, res)=>{
    const data = fs.readFileSync("./db/users.json")
    const database = JSON.parse(data)

    const user = req.body
    user.api_key = `${user.username}_${user.password}`

    if(user.username === "baccrie"){
        user.user_type = 'admin'
    }
    else{user.user_type = "user"}

    database.push(user)
    fs.writeFile("./db/users.json", JSON.stringify(database), (err)=>{
        if(err){
            res.status(500).json({
                message:"internal server error"
            })
        }
        res.status(200).json(user)
    })
}

module.exports = {createUser}