var jwt = require('jsonwebtoken')

var config = require('../config.secret.json').jwt

function AuthController() {
  // To login with credentials
  /**
   * Login with User credentials
   * @param {ExpressRequest} req Request Object
   * @param {Express.Response} res Respopnse Object
   */
  function login(req, res) {
    var credentials = {
      email: req.body.email,
      password: req.body.password,
    }

    // TODO: Check if email or password is empty
    // TODO: Fetch data from DB and check if it matches

    var payload = {
      email: credentials.email,
      // TODO: Other user details like name
    }
    var token = jwt.sign(payload, config.secret, {
      expiresIn: config.tokenLife,
    })
    var refreshToken = jwt.sign(credentials, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenLife,
    })

    var response = {
      message: 'Logged in',
      token: token,
      refreshToken: refreshToken,
    }

    // TODO: Save refresh token
    // tokenList[refreshToken] = response

    res.json(response)
  }

  function token(req, res) {
    var postData = req.body
    if (
      postData.refreshToken // If request contains refresh token
      // TODO: Check if refresh token is saved(valid)
      // postData.refreshToken in tokenList
    ) {
      var user = {
        email: postData.email,
        name: postData.name,
      }
      var token = jwt.sign(user, config.secret, {
        expiresIn: config.tokenLife,
      })
      var response = {
        token: token,
      }
      // TODO: update the token in the db
      // tokenList[postData.refreshToken].token = token
      res.json(200, response)
    } else {
      res.json(404, { message: 'Invalid Request' })
    }
  }

  function checkToken(req, res, next) {
    var token =
      req.body.token || req.query.token || req.headers['x-access-token']

    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.json(401, { message: 'Unauthorized access' })
        }
        req.user = decoded
        next()
      })
    } else {
      return res.json(403, { message: 'No token provided' })
    }
  }

  return {
    login: login,
    token: token,
    checkToken: checkToken,
  }
}

module.exports = AuthController
