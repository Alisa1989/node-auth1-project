const usersModel = require("./users-model")
const bcrypt = require("bcryptjs")
const Users = require("./users-model")

function restrict() {
	return async (req, res, next) => {
		try{
			if(!req.session || !req.session.user) {
				return res.status(401).json({
					message: "You shall not pass"
				})
			}
			next()

		} catch(err){
			next(err)
		}
	}
};

module.exports = {
	restrict,
}