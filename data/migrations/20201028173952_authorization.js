exports.up = async function(knex) {
	await knex.schema.createTable("auth", (table) => {
		table.increments()
		table.text("username").notNull().unique()
		table.text("password").notNull()
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("auth")
}
