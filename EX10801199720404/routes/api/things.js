var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();
var fileModel = require('./examenmodel');
var data = null;

var datosEmpresa = {
    'RTN':'',
    'Empresa':'',
    'Correo':'',
    'Rubro':'',
    'Direccion':'',
    'Telefono':''
}


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

router.post('/new', function(req, res, next){
    
    var _thingsData = Object.assign({}, datosEmpresa, req.body);
    _thingsData._id = uuidv4();
    if(!data){
        data = [];
    }
    data.push(_thingsData);
    fileModel.write(data, function(err){
        if(err){ 
            console.log(err);
            return res.status(500),json({'error': 'Error al obtener data'});
        }
        return res.status(200).json(_thingsData);
    });   
}); // Metodo POST


fileModel.read(function(err, filedata){
    if(err){
        console.log(err);
    }else{
        data = JSON.parse(filedata);
    }
});

module.exports = router;