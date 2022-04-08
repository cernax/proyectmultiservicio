const express = require('express');
const router = express.Router();
const upload = require("../middleware");
const Profile = require('../models/profiles');


router.get('/:acountuser', async (req, res) =>{
    var regex = new RegExp(req.params.acountuser, 'i')
    //const { acountuser } = req.body;
    const perfil = await Profile.find({
        acountuser: regex
    });
    res.json(perfil);
});

//add
router.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
    return res.send(imgUrl);
});

router.get('/add', async (req, res) =>{
    var regex = new RegExp(req.params.acountuser, 'i')
    //const { acountuser } = req.body;
    const perfil = await Profile.find({
        acountuser: regex
    });
    res.json(perfil);
});

//post
router.post('/', async (req, res) =>{
    const { acountuser, descrip, idtrabajos, profesion } = req.body;
    const perfil = new Profile({
        acountuser, descrip, idtrabajos, profesion
    });
    await perfil.save();
    res.json({status:"user saved"});
});

//put
router.put('/:id', async (req, res) =>{
    const { acountuser, descrip, idtrabajos } = req.body;
    const newprofiles = { acountuser, descrip, idtrabajos }
    await Profile.findByIdAndUpdate(req.params.id, newprofiles);
    res.json({status:"users updated"});
});

//delete
router.delete('/:id', async (req, res) =>{
    await Profile.findByIdAndRemove(req.params.id);
    res.json({status:"users deleted"});
});

module.exports = router;
