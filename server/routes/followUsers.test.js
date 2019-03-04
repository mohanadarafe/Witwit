const request = require('supertest');
jest.dontMock('../server')
const app = require('../server').app
var mock = {
  app:app,
  connection: jest.fn(()=>{})
}

jest.mock('../server',()=>mock)
//connection = jest.fn(()=>{})
//Making sure that the user can post a wit.



describe("testing post a wit",()=> {
  it("Can add a wit",function() {
    request(app).post('/s341-witwit/server/routes/timeline.js/witPost')
    .send({"wit":"Hello everyone", "userLoggedIN":"Hampic"})
    .expect(200)
  })
  it("Cannot add a long wit",function() {
    request(app).post('/s341-witwit/server/routes/timeline.js/witPost')
    .send({"wit":"Hello everyoneasnkdasj pasnfjasn [fpojasognasjasnfk as]fpjasof jasfaskj fasnknfkoasnf koasnf ko[sanf [soan fo[sna foas[fa fnasogn aso nafsoknfjsnvpoxkn oska[nasoks[oskacn oas[k sacn aso[asgksns o[cnas[ocoasn[o"+
    "asdasdasdasdasdsa", "userLoggedIN":"Hampic"})
    .expect(401)
  })
  it("Can not delete other people's wits", function(){
    request(app).post('/s341-witwit/server/routes/timeline.js/deleteWit')
    .send({"username": "Karen", "userLoggedIN":"Hampic"})
    .expect(401)
  })
  it("Can not empty wit", function(){
    request(app).post('/s341-witwit/server/routes/timeline.js/witPost')
    .send({"wit" : "","userLoggedIN":"Hampic"})
    .expect(200)
  })
})



describe("testing like a wit", ()=> {
  it("Can't like their own wit", function(){
    request(app).post('/s341-witwit/server/routes/timeline.js/like')
    .send({"username": "Hampic", "userLoggedIN":"Hampic"})
    .expect(401)
  })
})


describe("testing relying", ()=>{
  it("Can reply on a any wit", function(){
    request(app).post('/s341-witwit/server/routes/timeline.js/postReply')
    .send({"userLoggedIN":"Hampic","reply": "Heyo", "wit_id":35})
    .expect(200)
  })
})

