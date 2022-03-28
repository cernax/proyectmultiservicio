const express = require('express');
const router = express.Router();
const Profesion = require('../models/profesion');

router.get('/', async (req, res) =>{
    var regex = new RegExp(req.params.acountuser, 'i')
    //const { acountuser } = req.body;
    const profesion = await Profesion.find({});
    res.json(profesion);
});

//post
router.post('/', async (req, res) =>{
    const { id, profesion } = req.body;
    const profesions = new Profesion({
        id, profesion
    });
    await profesions.save();
    res.json({status:"user saved"});
});

//put
router.put('/:id', async (req, res) =>{
    const { acountuser, descrip, idtrabajos } = req.body;
    const newprofesion = { acountuser, descrip, idtrabajos }
    await Profesion.findByIdAndUpdate(req.params.id, newprofesion);
    res.json({status:"users updated"});
});

//delete
router.delete('/:id', async (req, res) =>{
    await Profesion.findByIdAndRemove(req.params.id);
    res.json({status:"users deleted"});
});

module.exports = router;
