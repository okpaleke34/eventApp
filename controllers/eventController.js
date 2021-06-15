const Sequelize = require("sequelize");
const db = require("../models/index");
const Op = db.Sequelize.Op;
const { Event } = require("../models/");

exports.view_all = async (req,res) =>{
    Event.findAll()
    .then(events =>{
        res.json({success:true,data:events})
    })    
    .catch(e =>{
        res.json({success:false,message:"Failed to load events"});
        console.log(e)
    })
    
}


exports.add_event = (req,res) =>{
    const {first_name,last_name,email,date} = req.body
    Event.create({first_name,last_name,email,date})
    .then(event =>{
        res.json({success:true,data:event})
    })    
    .catch(e =>{
        res.json({success:false,message:"Failed to create event check details and try again!"});
        console.log(e)
    })
}

exports.view_event = async (req,res) =>{
    const {id} = req.params
    const event = await Event.findByPk(id)
    if(event){
        res.json({success:true,data:event})
    }
    else{
        res.status(404).json({success:false,message:"Event does not exist"})
    }
}


exports.delete_event = async (req,res) =>{ 
    const {id} = req.params
    const event = await Event.destroy({
        where: {id}
      })
    if(event){
        res.json({success:true,message:"Event deleted successfully"})
    }
    else{
        res.json({success:false,message:"Failed to delete event"})
    }
}
 