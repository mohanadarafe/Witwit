jest.dontMock('../server')
const nock = require('nock')
jest.mock('../server',()=>mock)



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
    .post('/s341-witwit/server/routes/timeline.js/witPost')
    .reply(200, {
      post: {
        wit: "Hellp people",
        userLoggedIN : 'Hampic'
      }})
  })
  it("Cannot add a long wit",function() {
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/timeline.js/witPost')
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
    .post('/s341-witwit/server/routes/timeline.js/deleteWit')
    .reply(400, {
      witInfo: {
        username:"Hampic",
        userLoggedIN: "Hampic"
      }
  })
  })
  it("Get the list of likes for a wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/timeline.js/likesList')
    .reply(200, {
      replyListInfo: {
        wit_id: 5
      }
    })
  })
  it("Delet my own wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/timeline.js/deleteWit')
    .reply(200,{
      witInfo: {username: "Hampic",
    wit_id: 24}
    })
  })
  })

/*
 * CORE FEATURE II - LIKE A WIT
 * Test cases: 
 * Like a wit
 * Like a wit twice
*/

describe("testing like a wit", ()=> {
  //Liking your own wit
  it("Can't like their own wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/timeline.js/like')
    .reply(401, {
      witObject: {
        username : 'Hampic',
        userLoggedIN : 'Hampic'
      }
    })
  })
  it("Can't like a wit twice", function(){
    //Liking a wit twice
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/timeline/like') //Like one
    .reply(200, {
      witObject : {
        username : 'Hampic',
        userLoggedIN : 'Hampic'
      }
    })
    .post('/s341-witwit/server/routes/timeline/like') //Like two
    .reply(401, {
      witObject : {
        username : 'Hampic',
        userLoggedIN : 'Hampic'
      }
    })
  })
  it("like a wit from following someone",function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/timeline/like')
    .reply(200,{
      witInfo : {
        username: "Hampic",
        wit_id: 4
      }
    })
  })
    //like a wit of someone you are not following
    it("Can like a wit of someone the user is not following", function(){
      const scope = nock('http://localhost:3002')
      .post('/s341-witwit/server/routes/timeline.js/like') 
      .reply(200, {           
        witObject: {        
          username : 'hussain',
          userLoggedIN : 'Alain',
          wit_id : '35'
        }
      }) 
    })
  
    //Unlike a wit
    it("Can unlike a wit", function(){
      const scope = nock('http://localhost:3002')
      .post('/s341-witwit/server/routes/timeline.js/like') 
      .reply(401, {          
        witObject: {      
          username : 'hussain',
          userLoggedIN : 'Alain',
          wit_id : '35'
        }
      }) 
    })
})
/*
 * CORE FEATURE III - FOLLOW A USER
 * Test cases: 
 * Follow a user
 * Unfollow a user
 * Follow yourself
*/

describe("testing following", ()=>{
  //Follow another uset
  it("Can follow another user", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/followUsers.js/followUser')
    .reply(200, {
      witObject: {
        username : 'Hampic',
        userLoggedIN : 'Alain'
      }
    }) 
  })

  //Unfollow a user

  it("Can unfollow a user", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/followUsers.js/followUser')
    .reply(200, {
      witObject : {
        username : 'Hampic',
        userLoggedIN : 'Alain'
      }
    })
  })

  //Following yourself

  it("Cannot follow yourself", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/followUsers/followUser')
    .reply(200, {
      witObject : {
        username : 'Alain',
        userLoggedIN : 'Alain'
      }
    })
  })
  it("retrieve the list of following",function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/profile/getListFollowingOfFollowing')
    .reply(200, {
      userInfo : {
        username: "karen"
      }
    })
  })
})



/*
 * CORE FEATURE ADDITIONAL - REPLY
 * Test cases: 
 * Reply to someone
*/
describe("testing reply", ()=>{
  //Reply to someone
  it("can reply to any wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/timeline.js/postReply')
    .reply(200, {
      witObject: {
        wit_id : '35',
        userLoggedIN : 'Hampic',
        reply : 'Hey'
      }
    })
  })
})

