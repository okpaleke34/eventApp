const joi = require("joi")
const  schema = {
    event:joi.object({
        first_name:joi.string().max(65).required(),
        last_name:joi.string().max(65).required(),
        email:joi.string().email().max(65).required(),
        date:joi.date().required(),
    })
}

module.exports = schema;