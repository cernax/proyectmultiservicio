const express = require('express');
const router = express.Router();
const Portafolio = require('../models/portafolio');
const fs = require('fs-extra');
const fileupload = require('express-fileupload');
const {uploadImage, deleteImage} = require("../middleware");

//get
router.get('/', async (req, res) =>{
    const users = await Portafolio.find();
    console.log(users);
    res.json(users);
});

router.get('/:acountuser', async (req, res) =>{
    var user = new RegExp(req.params.acountuser, 'i')

    const users = await Portafolio.find({
        acountuser: user
    });
    res.json(users);
});

//post
router.post('/', fileupload({
    useTempFiles: true,
    tempFileDir: './Portafolio'
}), async (req, res) =>{
    debugger;

    const { acountuser, descrip, nomportafolio } = req.body;
    const perfil = new Portafolio({
        acountuser, descrip, nomportafolio
    });

    if(req.files?.img){
        const result = await uploadImage(req.files.img.tempFilePath, acountuser);
        perfil.image = {
            public_id:result.public_id,
            url:result.secure_url
        }

        await fs.unlink(req.files.img.tempFilePath);
    }

    await perfil.save();
    res.json({status:"portafolio saved"});
});

//put
router.put('/:id', async (req, res) =>{
    const { nombreuser, correouser, passuser, acountuser } = req.body;
    const newusers = { nombreuser, correouser, passuser, acountuser }
    await Portafolio.findByIdAndUpdate(req.params.id, newusers);
    res.json({status:"portafolio updated"});
});

//delete
router.delete('/:id', async (req, res) =>{
    await Portafolio.findByIdAndRemove(req.params.id);
    res.json({status:"portafolio deleted"});
});

module.exports = router;
