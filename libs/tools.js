const bcrypt = require("bcryptjs");

const tools = {
    enBcrypt(password) {
        return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
    }
}

module.exports = tools;