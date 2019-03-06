/* Travis CI Test Cases
 * 20 Cases testing the functionality or our core features
*/

/*
 *Test Case 1: Liking a post more than once
 *Author: Mohanad
 * 
 *Pass Case: 0 likes -> 1 likes -> 0 likes
 *Fail Case: 0 likes -> 1 likes -> 2 likes
*/
const likeWit = require('./server/routes/timeline');


/*
 *Test Case 2: Posting an empty Wit
 *Author: Mohanad
 * 
 *Pass Case: Subscribe function works
 *Fail Case: Subscribe function does not work
*/
