var express = require('express')
var router = express.Router()

var authController = require('../controllers/AuthController')()

router.post('/login', authController.login)
router.post('/token', authController.token)

var authVerifier = authController.checkToken

router.get('/confidential', authVerifier, function(req, res) {
  res.json(200, { message: 'This is a secure point.', data: req.user })
})

module.exports = router
