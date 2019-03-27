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



/*
 * CORE FEATURE ADDITIONAL - REPLY
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
        wit_id : '36',//
        userLoggedIN: "Hampic"
      }
    })
  })

})

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
