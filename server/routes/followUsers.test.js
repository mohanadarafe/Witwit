const request = require('supertest');
jest.dontMock('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
//const app = require('../server').app

jest.mock('../server',()=>mock)
//connection = jest.fn(()=>{})
//Making sure that the user can post a wit.

chai.use(chaiHttp)

//Post a wit test cases
// describe("testing post a wit",()=> {
//   it("Can add a wit",function() {
//     chai.request(app)
    
//     .post('/s341-witwit/server/routes/timeline.js/witPost')
//     .send({"wit":"Hello everyone", "userLoggedIN":"Hampic"})
//     .set('content-type', 'text/plain')
//     .end(function (err, res) {
//       if(err) {console.log(err)}
//       expect(res.status).toBe(200)
//     })
//   })
//   it("Cannot add a long wit",function() {
//     chai.request(app)
//     .post('/s341-witwit/server/routes/timeline.js/witPost')
//     .send({"wit":"Hello everyoneasnkdasj pasnfjasn [fpojasognasjasnfk as]fpjasof jasfaskj fasnknfkoasnf koasnf ko[sanf [soan fo[sna foas[fa fnasogn aso nafsoknfjsnvpoxkn oska[nasoks[oskacn oas[k sacn aso[asgksns o[cnas[ocoasn[o"+
//     "asdasdasdasdasdsa", "userLoggedIN":"Hampic"})
//     .set('content-type', 'text/plain')
//     .end(function (err, res) {
//       if (err) { console.error(err) }
//       expect(res.status).toBe(200)
//     })
//   })
//   it("Can not delete other people's wits", function(){
//     chai.request(app)
//     .post('/s341-witwit/server/routes/timeline.js/deleteWit')
//     .send({"username": "Karen", "userLoggedIN":"Hampic"})
//     .set('content-type', 'text/plain')
//     .end(function (err, res) {
//       if (err) { console.error(err) }
//         rexpect(res.status).toBe(401)
//     })
//   })
// })


// //Like a wit test cases
// describe("testing like a wit", ()=> {
//   it("Can't like their own wit", function(){
//     chai.request(app)
//     .post('/s341-witwit/server/routes/timeline.js/like')
//     .send({"username": "Hampic", "userLoggedIN":"Hampic"})
//     .end((err, res) => {
//       if (err) { console.error(err) }
//         res.should.have.status(401)
//         done()
//     })
//   })
//   it("Can't like a wit twice", function(){
//     chai.request(app)
//     .post('/s341-witwit/server/routes/timeline.js/like') //Like one
//     .send({"username": "Hampic", "userLoggedIN":"Hampic"})
//     .end((err, res) => {
//       if (err) { console.error(err) }
//         res.should.have.status(401)
//         done()
//     })
//     chai.request(app)
//     .post('/s341-witwit/server/routes/timeline.js/like') //Like one
//     .send({"username": "Hampic", "userLoggedIN":"Hampic"})
//     .end((err, res) => {
//       if (err) { console.error(err) }
//         res.should.have.status(401)
//         done()
//     })
//   })
// })

// //Follow a witter test case
// describe("testing following", ()=>{
//   it("Can follow another user", function(){
//     chai.request(app)
//     .post('/s341-witwit/server/routes/followUsers.js/followUser')
//     .send({"username": "Hampic", "userLoggedIN":"Alain"})
//     .end((err, res) => {
//       if (err) { console.error(err) }
//         res.should.have.status(200)
//         done()
//     })
//   })
//   it("Can unfollow a user", function(){
//     chai.request(app)
//     .post('/s341-witwit/server/routes/followUsers.js/followUser')
//     .send({"username": "Hampic", "userLoggedIN":"Alain"})
//     .end((err, res) => {
//       if (err) { console.error(err) }
//         res.should.have.status(200)
//         done()
//     })
//   })
//   it("Cannot follow yourself", function(){
//     request(app).post('/s341-witwit/server/routes/followUsers.js/followUser')
//     .send({"username": "Alain", "userLoggedIN":"Alain"})
//     .end((err, res) => {
//       if (err) { console.error(err) }
//         res.should.have.status(200)
//         done()
//     })
//   })
// })


// describe("testing replying", ()=>{
//   it("Can reply on a any wit", function(){
//     chai.request(app)
//     .post('/s341-witwit/server/routes/timeline.js/postReply')
//     .send({"userLoggedIN":"Hampic","reply": "Heyo", "wit_id":35})
//     .set('content-type', 'application/json')
//     .end(
//       function(err, res){
//         if(err) console.log(err)
//         expect(res.status).toEqual(415)
//       }
//     )   
    
//   })
// })
