const db = require("../data/config")

async function add(user) {
	const [id] = await db("auth").insert(user)
	return findById(id)
}

function find() {
	return db("auth").select("id", "username")
}

function findBy(filter) {
	return db("auth")
		.select("id", "username", "password")
		.where(filter)
}

function findById(id) {
	return db("auth")
		.select("id", "username")
		.where({ id })
		.first()
}

module.exports = {
	add,
	find,
	findBy,
	findById,
}
