const express = require("express")
const session = require("express-session")
//const KnexSessionStore = require("connect-session-knex")(session)
const db = require("./data/config")
const usersRouter = require("./users/users-router")

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())
server.use(session({
	resave: false, //avoids creating sessions that haven't changed
	saveUninitialized: false, // GDPR laws against setting cookies automatically
	secret: "keep it secret, keep it safe", // used to cryptographically sign the cookie
	// store the session data in the database rather than in memory
	// store: new KnexSessionStore({
	// 	knex: db, // configured instance of knex
	// 	createtable: true, // if the table does not exist, it will create it automatically
	// }),
}))

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
