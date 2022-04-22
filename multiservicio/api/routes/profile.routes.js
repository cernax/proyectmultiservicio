const express = require('express');
const router = express.Router();
const {uploadImage, deleteImage} = require("../middleware");
const Profile = require('../models/profiles');
const fs = require('fs-extra');
const fileupload = require('express-fileupload');

router.get('/:acountuser', async (req, res) =>{
    var regex = new RegExp(req.params.acountuser, 'i')
    //const { acountuser } = req.body;
    const perfil = await Profile.find({
        acountuser: regex
    });
    res.json(perfil);
});

//add

//post
router.post('/', fileupload({
    useTempFiles: true,
    tempFileDir: './uploads'
}), async (req, res) =>{
    debugger;

    const { acountuser, descrip, idtrabajos, profesion } = req.body;
    const perfil = new Profile({
        acountuser, descrip, idtrabajos, profesion
    });

    console.log(req.files?.img);

    if(req.files?.img){
        const result = await uploadImage(req.files.img.tempFilePath, acountuser);
        perfil.image = {
            public_id:result.public_id,
            url:result.secure_url
        }

        await fs.unlink(req.files.img.tempFilePath);
    }

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
    const profile =  await Profile.findByIdAndRemove(req.params.id);
    res.json({status:"users deleted"});

    await deleteImage(profile.image.public_id);
});

module.exports = router;
