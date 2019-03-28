jest.dontMock('../../server')
const nock = require('nock')
jest.mock('../../server',()=>mock)


/*
 * CORE FEATURE I - POST A WIT
 * Test cases:
 * Post an empty Wit
 * Post a long Wit
 * Delete another users Wit
*/

describe("testing post a wit",()=> {
  it("Can add a wit",function() {
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postWit')
    .reply(200, {
      post: {
        wit: "Hellp people",
        userLoggedIN : 'Hampic'
      }})
  })
  it("Cannot add a long wit",function() {
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postWit')
    .reply(400, {
      post: {
        wit:"Hello everyoneasnkdasj pasnfjasn [fpojasognasjasnfk as]fpjasof jasfaskj fasnknfkoasnf koasnf ko[sanf [soan fo[sna foas[fa fnasogn aso nafsoknfjsnvpoxkn oska[nasoks[oskacn oas[k sacn aso[asgksns o[cnas[ocoasn[o"+
        "asdasdasdasdasdsa",
        userLoggedIN: "Hampic"
      }
    })
  })
  it("Can not delete other people's wits", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/delete.js/deleteWit')
    .reply(400, {
      witInfo: {
        username:"Hampic",
        userLoggedIN: "Hampic"
      }
  })
  })
  it("Get the list of likes for a wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeLists.js/witLikesList')
    .reply(200, {
      replyListInfo: {
        wit_id: 5
      }
    })
  })

  it("Get the list of reply's likes", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeLists.js/replyLikesList')
    .reply(200, {
      replyListInfo: {
        wit_id: 5
      }
    })
  })

  it("Show wits which the current user already liked", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeChecks.js/likedWits')
    .reply(400, {
      witObject: {
        userLoggedIN: "Hampic"
      }
    })
  })

  it("Delet my own wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/delete.js/deleteWit')
    .reply(200,{
      witInfo: {username: "Hampic",
    wit_id: 24}
    })
  })
  it("Can't delete a wit twice", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/delete.js/deleteWit')
    .reply(200,{
      witInfo: {username: "Hampic",
    wit_id: 24}
    })
    scope.post('/s341-witwit/server/routes/postWit_postReply/delete.js/deleteWit')
    .reply(400,{
      witInfo: {username: "Hampic",
    wit_id: 24}
    })
  })
  it("Cannot post an empty wit",function() {
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postWit')
    .reply(401, {
      post: {
        wit:"",
        userLoggedIN: "Hampic"
      }
    })
  })
  })
