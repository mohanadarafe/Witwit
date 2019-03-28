jest.dontMock('../../server')
const nock = require('nock')
jest.mock('../../server',()=>mock)


/*
 * CORE FEATURE III - FOLLOW A USER
 * Test cases:
 * Follow a user
 * Unfollow a user
 * Follow yourself
*/

describe("testing following", ()=>{
  //Follow another user
  it("Can follow another user", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/follow/followUser.js/followUser')
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
    .post('/s341-witwit/server/routes/follow/followUser.js/followUser')
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
    .post('/s341-witwit/server/routes/follow/followUser.js/followUser')
    .reply(200, {
      userInfo : {
        username : 'Alain',
        userLoggedIN : 'Alain'
      }
    })
  })
  //Get following list
  it("retrieve the list of following of any user",function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/follow/followingList.js/getListFollowing')
    .reply(200, {
      userInfo : {
        username: "karen"
      }
    })
  })

  //Get the following list of the current user:
it("retrieve the list of following of the current user",function(){
  const scope = nock('http://localhost:3002')
  .post('/s341-witwit/server/routes/follow/followingList.js/getMyListFollowing')
  .reply(200, {
    userInfo : {
      userLoggedIN: "karen"
    }
  })
})

 //Get follower list of any user
 it("retrieve the list of followers of any user",function(){
  const scope = nock('http://localhost:3002')
  .post('/s341-witwit/server/routes/follow/followerList.js/getListFollowers')
  .reply(200, {
    userInfo : {
      username: "karen"
    }
  })
})

//Get the follower list of the current user:
it("retrieve the list of followers of current user",function(){
  const scope = nock('http://localhost:3002')
  .post('/s341-witwit/server/routes/follow/followerList.js/getListMyFollowers')
  .reply(200, {
    userInfo : {
      userLoggedIN: "karen"
    }
  })
})
})
