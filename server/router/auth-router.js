const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth-controller")
// router.get('/',(req,res)=>{
//     res.status(200).send('Welcome to MERN 2024 tutorial using router')
// })
router.route('/').get(authControllers.home);
router.route('/register').post(authControllers.register);
router.route('/login').post(authControllers.login);

module.exports = router;
