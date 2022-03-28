const express = require('express');
const router = express.Router();
const Users = require('../models/users');

//get
//router.get('/', async (req, res) =>{
    //const users = await Users.find();
    //console.log(users);
    //res.json(users);
//});

//router.get('/:id', async (req, res) =>{
   // const users = await Users.findById(req.params.id);
   // res.json(users);
//});
router.get('/:acountuser', async (req, res) =>{
    var regex = new RegExp(req.params.acountuser, 'i')
    //const { acountuser } = req.body;
    const users = await Users.find({
        acountuser: regex
    });
    res.json(users);
});

//post
router.post('/', async (req, res) =>{
    const { nombreuser, correouser, passuser, acountuser, tipouser } = req.body;
    const users = new Users({
        nombreuser, correouser, passuser, acountuser, tipouser
    });
    await users.save();
    res.json({status:"user saved"});
});

//put
router.put('/:id', async (req, res) =>{
    const { nombreuser, correouser, passuser, acountuser } = req.body;
    const newusers = { nombreuser, correouser, passuser, acountuser }
    await Users.findByIdAndUpdate(req.params.id, newusers);
    res.json({status:"users updated"});
});

//delete
router.delete('/:id', async (req, res) =>{
    await Users.findByIdAndRemove(req.params.id);
    res.json({status:"users deleted"});
});

module.exports = router;
