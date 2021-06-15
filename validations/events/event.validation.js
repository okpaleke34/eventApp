const {event} = require("./event.schema")

module.exports = {
    addEventValidation: async (req,res,next) =>{
        const value = await event.validate(req.body);
        if(value.error){
            res.json({
                success:false,
                message: value.error.details[0].message
            })
        }
        else{
            next()
        }
    }
}