const express = require("express")
const cors = require("cors")
const db = require("./models");

const eventsRouter = require('./routes/events')

const app = express()
const port = process.env.PORT || 4001

app.use(cors())
app.use(express.json())

db.con.sync({
    logging:false
});

app.use('/events', eventsRouter)
if(!module.parent){
    app.listen(port, ()=>{
        console.log(`Server is running on port: ${port}`);
    })
}
module.exports = app;