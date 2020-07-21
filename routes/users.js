var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
// /api/users
router.get("/users", function(req, res, next) {
    
    users.getUsers(req, res, next);
});



router.get("/users/:userId", function(req, res, next) {

    users.getUserById(req.params.userId, req, res);
});
   

module.exports = router;