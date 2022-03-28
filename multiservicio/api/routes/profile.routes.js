const express = require('express');
const router = express.Router();
const multer = require("multer");
const Profile = require('../models/profiles');

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, "./client/public/uploads/");
    },
    filename: (req, file, callback) =>{
        callback(null, file.originalname);
    }
})

const upload = multer({storage:storage})

router.get('/:acountuser', async (req, res) =>{
    var regex = new RegExp(req.params.acountuser, 'i')
    //const { acountuser } = req.body;
    const perfil = await Profile.find({
        acountuser: regex
    });
    res.json(perfil);
});

//add
router.post("/add", upload.single("articleImage"), (req, res) => {
    const newArticle = new Profile({
        title:req.body.title,
        article: req.body.article,
        authorname: req.body.authorname,
        articleImage: req.file.articleImage
    });
    newArticle
        .save()
        .then(() => res.json("new Article posted!"))
        .catch((err) => res.status(400).json("Error:" + err));
})

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
