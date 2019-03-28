jest.dontMock('../../server')
const nock = require('nock')
jest.mock('../../server',()=>mock)


/*
 * ADDITIONAL FEATURE - REPLY
 * Test cases:
 * Reply to someone
*/
describe("testing reply", ()=>{
  //Reply to someone
  it("can reply to any wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postReply')
    .reply(200, {
      witObject: {
        wit_id : '35',
        userLoggedIN : 'Hampic',
        reply : 'Hey'
      }
    })
  })
  it("delete a reply", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/delete.js/deleteReply')
    .reply(200, {
      witObject: {
        wit_id : '35',
        userLoggedIN : 'Hampic',
        reply : 'Hey'
      }
    })
  })

  it("Retrieve the content of A reply to edit it", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/edit.js/getReplyContent')
    .reply(200, {
      witObject: {
        wit_id : '35',
        userLoggedIN : 'Hampic',
        reply : 'YO' //needed?!
      }
    })
  })


  it("Edit a reply", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/edit.js/editReply')
    .reply(200, {
      witObject: {
        wit_id : '35',
        userLoggedIN : 'Hampic',
        reply : 'YO'
      }
    })
  })

  it("User can see the list of replies in a wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/repliesList.js/repliesList')
    .reply(200, {
      witObject: {
        wit_id : '35',
        userLoggedIN : 'Hampic',
      }
    })
  })

  it("cannot post a very long reply", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postReply')
    .reply(400, {
      witObject: {
        wit_id : '35',
        wit:"Hello everyoneasnkdasj pasnfjasn [fpojasognasjasnfk as]fpjasof jasfaskj fasnknfkoasnf koasnf ko[sanf [soan fo[sna foas[fa fnasogn aso nafsoknfjsnvpoxkn oska[nasoks[oskacn oas[k sacn aso[asgksns o[cnas[ocoasn[o"+
        "asdasdasdasdasdsa",
        userLoggedIN: "Hampic"
      }
    })
  })
  it("cannot post an empty reply", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/postWit_postReply/post.js/postReply')
    .reply(400, {
      witObject: {
        wit_id : '35',
        wit:"",
        userLoggedIN: "Hampic"
      }
    })
  })
  it("Show Replies for which the current user already liked", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeChecks.js/likedReplies')
    .reply(400, {
      witObject: {
        wit_id : '35',
        userLoggedIN: "Hampic"
      }
    })
  })
  it("User can like a reply", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/likeReply.js/likeReply')
    .reply(400, {
      witObject: {
        wit_id : '36',//
        userLoggedIN: "Hampic"
      }
    })
  })
  it("User can unlike a reply", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/likeReply.js/unlikeReply')
    .reply(400, {
      witObject: {
        wit_id : '36',
        userLoggedIN: "Hampic"
      }
    })
  })

})
