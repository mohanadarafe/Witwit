jest.dontMock('../../server')
const nock = require('nock')
jest.mock('../../server',()=>mock)


/*
 * CORE FEATURE II - LIKE A WIT
 * Test cases:
 * Like a wit
 * Like a wit twice
 * See all the wits I liked
*/

describe("testing like a wit", ()=> {
  //Liking your own wit
  it("Can't like their own wit", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeWits.js/likeWit')
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
    .post('/s341-witwit/server/routes/like/likeWits.js/likeWit') //like one
    .reply(200, {
      witObject : {
        username : 'Hampic',
        userLoggedIN : 'Hampic'
      }
    })
    .post('/s341-witwit/server/routes/like/likeWits.js/likeWit') //like two
    .reply(401, {
      witObject : {
        username : 'Hampic',
        userLoggedIN : 'Hampic'
      }
    })
  })
  it("like a wit from following someone",function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeWits.js/likeWit')
    .reply(200,{
      witInfo : {
        username: "Hampic",
        wit_id: 4
      }
    })
  })

  it("Can see all the wits user liked", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/like/likeList.js/witLikesList')
    .reply(200, {
      witObject: {
        userLoggedIN : 'daphne'
      }
    })
  })

    //like a wit of someone you are not following
    it("Can like a wit of someone the user is not following", function(){
      const scope = nock('http://localhost:3002')
      .post('/s341-witwit/server/routes/like/likeWits.js/likeWit')
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
      .post('/s341-witwit/server/routes/like/likeWits.js/unlikeWit')
      .reply(401, {
        witObject: {
          username : 'hussain',
          userLoggedIN : 'Alain',
          wit_id : '35'
        }
      })
    })
})
