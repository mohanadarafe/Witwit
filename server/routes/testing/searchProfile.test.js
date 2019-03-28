jest.dontMock('../../server')
const nock = require('nock')
jest.mock('../../server',()=>mock)


/*
 * Test cases:
 * Search bar
*/
describe("testing search engine", ()=>{

  it("search a user", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/searchEngine.js/search')
    .reply(400, {
      userInfo: {
        username : 'hampic',
        userLoggedIN : 'hussain'
      }
    })
  })

  it("Dropdown list", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/searchEngine.js/dropDownList')
    .reply(400, {
      userInfo: {
        username : 'hampic',
      }
    })
  })

  it("Retrieving the info regarding the user searched", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/userProfile.js/userInfo')
    .reply(400, {
      userInfo: {
        username : 'karen',
        userLoggedIN : 'hampic'
      }
    })
  })


})

/*
 * Test cases:
 * login/timeline/profile/upload profile pic/forgot/editInformation
*/
describe("Testing login/timeline/profile/upload profile pic/forgot/editInformation", ()=>{

  it("User can log in", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/login_register.js/login')
    .reply(401, {
      userInfo: {
        username : 'hussain'

      }
    })
  })

  it("User can register", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/login_register.js/register')
    .reply(200, {
      userInfo: {
        username : 'hussain',
        email : 'hussain@live.com'
      }
    })
  })


/**
 * User Profile
 */
  it("User can access another user's timeline", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/timeline.js/timelineProfile')
    .reply(200, {
      userInfo: {
        username : 'hussain',
        userLoggedIN: 'hussain'
      }
    })
  })

  it("Timeline for current user", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/timeline.js/timeline')
    .reply(200, {
      userInfo: {
        username : 'hussain',
        userLoggedIN: 'hussain'
      }
    })
  })


  it("profile", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/profile.js/profile')
    .reply(400, {
      userInfo: {
        userLoggedIN: 'hussain'
      }
    })
  })


  it("Getting liked wits for the wits tab", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/userProfile.js/likedWits')
    .reply(400, {
      userInfo: {
        username : 'hampic',
        userLoggedIN: 'hussain'
      }
    })
  })

  it("See Wits", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/userProfile.js/wits')
    .reply(400, {
      userInfo: {
        username : 'hampic'
      }
    })
  })

  /**
   * ********************************************
   */

  it("User can upload a profile picture", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/fileUpload.js/upload')
    .reply(400, {
      userInfo: {
        userLoggedIN: 'hussain'
      }
    })
  })

  it("User forgot login information", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/login_register.js/forgot')
    .reply(200, {
      userInfo: {
        username : 'hussain',
        email : 'hussain@live.com'
      }
    })
  })

  it("Retrieving wits liked by the current user", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/login_register.js/likedWitsTab')
    .reply(200, {
      userInfo: {
        userLoggedIN: 'hussain'
      }
    })
  })

  /**
   * Edit settings
   */
  it("Edit username", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/profile.js/editUsername')
    .reply(200, {
      userInfo: {
        userLoggedIN: 'hussain',
        username: 'witwit'
      }
    })
  })

  it("Edit email", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/profile.js/editEmail')
    .reply(200, {
      userInfo: {
        userLoggedIN: 'hussain',
        email: 'witwit@gmail.com'
      }
    })
  })


  it("Edit age", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/profile.js/editAge')
    .reply(200, {
      userInfo: {
        userLoggedIN: 'hussain',
        age: '45'
      }
    })
  })

  it("reset password", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/profile.js/resetPassword')
    .reply(200, {
      userInfo: {
        userLoggedIN: 'hussain',
        password: 'tweetweety'
      }
    })
  })


  it("Send the token request", function(){
    const scope = nock('http://localhost:3002')
    .post('/s341-witwit/server/routes/main_pages/profile.js/User')
    .reply(200, {
      userInfo: {
        //
      }
    })
  })
})
