const express = require('express');
const config = require('config.json');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const {OAuth2Client} = require('google-auth-library');


// routes
router.post('/tokensignin', googleSignIn);     // public route
router.post('/authenticate', authenticate);     // public route
router.get('/', authorize(Role.Admin), getAll); // admin only
router.get('/:id', authorize(), getById);       // all authenticated users
module.exports = router;



function googleSignIn(req, res, next) {
  CLIENT_ID = '71210526275-eo6e9r5lt764jbc0ag931kqiqcen92lj.apps.googleusercontent.com';
  var token = req.body.id_token;
  console.log("Received Token: "+token)
  const client = new OAuth2Client(CLIENT_ID);
  async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];


  //TO VALIDATE THE TOKEN->
  //send a get request to:
  //https://oauth2.googleapis.com/tokeninfo?id_token=token
  //If you receive a HTTP 200 Response in this format, everything is fine:
  //{
 // These six fields are included in all Google ID Tokens.
 /*
 "iss": "https://accounts.google.com",
 "sub": "110169484474386276334",
 "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
 "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
 "iat": "1433978353",
 "exp": "1433981953",

 // These seven fields are only included when the user has granted the "profile" and
 // "email" OAuth scopes to the application.
 "email": "testuser@gmail.com",
 "email_verified": "true",
 "name" : "Test User",
 "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
 "given_name": "Test",
 "family_name": "User",
 "locale": "en"
}*/
user = { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin };
user.token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
res.json(user);
}
verify().catch(console.error);

}




function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
