const express = require("express")
const Users = require("./users-model")
const bcrypt = require("bcryptjs")
const {restrict} = require("./users-middleware")

const router = express.Router()

// | GET    | /api/users    | If the user is logged in, respond with an array of all the users contained in the database. 
//If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.  
router.get("/users", restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
})


// | POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. 
//**Hash the password** before saving the user to the database.           
            
router.post("/users", async (req,res,next) => {
    try { 
        const {username, password} = req.body
        const user = await Users.findBy({username}).first()
        if(user) {
            return res.status(400).json({
                message: "Username is already taken"
            })
        }

        const newUser = await Users.add({
            username,
            password: await bcrypt.hash(password,14),
        })
        res.status(201).json(newUser)
    } catch(err) {
        next(err)
    }
})

// | POST   | /api/login    | Use the credentials sent inside the `body` to authenticate the user. On successful login, 
//create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, 
//respond with the correct status code and the message: 'You shall not pass!' |

router.post("/login", async (req,res,next) =>{
    try{
        const {username, password } = req.body
        const user = await Users.findBy({ username }).first()

        if(!user) {
            return res.status(401).json({
                message: "You shall not pass!"
            })
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
            return res.status(401).json({
                message: "You shall not pass!"
            })
        }

        req.session.user = user
        res.json({
            message: `Welcome ${user.username}!`,
        })

    }catch(err){
        next(err)
    }
})


module.exports = router

