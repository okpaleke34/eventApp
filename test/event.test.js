const chai = require("chai")
const chaiHttp =  require("chai-http")
const server = require("../server")
// Assertion style
chai.should()

chai.use(chaiHttp)
chai.request('http://localhost:4001')

describe("Event API", ()=>{

    // Test the GET route
    describe("GET /events/ ",()=>{
        it("It should GET all the events",(done)=>{
            chai.request(server)
            .get("/events/")
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.data.should.be.a('array')
                res.body.success.should.be.a('boolean').eq(true)
                done()
            })
        })
    })

    describe("GET /events/view/:id",()=>{
        it("It should GET an event with id",(done)=>{
            let eventID = 1
            chai.request(server)
            .get("/events/view/"+ eventID)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.data.should.be.a('object')
                res.body.success.should.be.a('boolean').eq(true)
                done()
            })
        })
    })


    // Test the POST route
    describe("POST /events/add",()=>{
        it("It should add an event to the database",(done)=>{
            let event = {first_name:"John",last_name:"Doe",email:"john@gmail.com",date:"2021-05-16"}
            chai.request(server)
            .post("/events/add")
            .send(event)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.data.should.be.a('object')
                res.body.success.should.be.a('boolean').eq(true)
                done()
            })
        })
    })

    
    // Test the DELETE route
    describe("DELETE /delete/:id",()=>{
        it("It should delete an event from the database",(done)=>{
            let eventID = 1
            chai.request(server)
            .delete("/events/delete/"+eventID)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.message.should.be.a('string')
                res.body.success.should.be.a('boolean').eq(true)
                done()
            })
        })
    })

})