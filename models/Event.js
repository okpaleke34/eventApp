module.exports = (con,Sequelize) =>{
    const {STRING,DATEONLY} = Sequelize
    const Event = con.define("event",{
        first_name:{
            type:STRING(65),
            allowNull:false
        },
        last_name:{
            type:STRING(65),
            allowNull:false
        },
        email:{
            type:STRING(65),
            allowNull:false
        },
        date:{
            type: DATEONLY,
            allowNull:false
        }
    })
    return Event
}