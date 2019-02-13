var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();
var fileModel = require('./examenmodel');
var data = null;


router.get('/', function(req, res, next){
    if(!data){
        fileModel.read(function(err, filedata){
            if(err){
                console.log(err);
                data = [];
                return res.status(500).json({'error': 'Error al obtener Data'});
            }
            data = JSON.parse(filedata);
            return res.status(200).json(data);
        });
    } else{
            return res.status(200).json(data);

    }    
}); // Metodo GET


fileModel.read(function(err, filedata){
    if(err){
        console.log(err);
    }else{
        data = JSON.parse(filedata);
    }
});

module.exports = router;