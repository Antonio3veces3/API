const express=  require("express");
const bodyparser= require("body-parser");
const estructura= require("../modelo/estructura");
var vector= new estructura(); 
const book=require("../modelo/clase");
const cors=require("cors"); 
const app= express();

app.use(bodyparser.urlencoded({extended: false}));//Convierte la peticion en objeto json
app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
  });

app.listen(3002,()=>{
    console.log("Escuchando en el puerto 3002");
});
app.get("/",cors(),(req,res)=>{
    res.status(200).send({tipo: "Exitoso",
    mensaje: "Bienvenido a la API"});
});
app.route('/libros')
.get(cors(),function(req,res){
    if(vector.size()==0){
        res.status(500).send({
            tipo: "Error",
            mensaje:"La lista esta vacia"
        });
    }
    else{
        res.status(200).send({
            tipo:"Exitoso",
            mensaje:"Todos los libros",
            respuesta: vector.mostrar()
        })
    }
})
.post(cors(),function(req,res){
    console.log(req.body); 
    if(req.body.Id && req.body.Titulo){
        let i=0, verificador=-1;
        while(i<vector.size()){
            if(req.body.Titulo===vector.vector[i].Titulo)
            verificador=i;
            i++; 
        }
        if(verificador!=-1){
            res.status(500).send({
                tipo: "Error",
                mensaje: "El libro ya existe"
            });
        }else{
            var libro= new book(); 
            libro=req.body;
            vector.agregar(libro); 
            res.status(200).send({
                tipo:"Exitoso",
                mensaje: "Libro agregado correctamente"
            });
        }
    }else{
        res.status(500).send({
            tipo:"Error",
            mensaje: "Informacion incompleta"
        });
    }
})
.put(cors(),function(req,res){
    console.log(req.body);
    if(req.body.Titulo){
        let i=0;
        let verificador=-1;
        while(i<vector.size()){
            if(vector.vector[i].Titulo==req.body.Titulo)
            verificador=i;
            i++; 
        }
        if(verificador==-1){
            res.status(500).send({tipo: "Error",
            mensaje: "El libro no existe"}); 
        }else{
            vector.vector[verificador]=req.body;
            res.status(200).send({
                tipo:"Exitoso",
                mensaje: "Libro actualizado"
            });
        }
    }
    else{
        res.status(500).send({
            tipo:"Error",
            mensaje: "Se requiere el titulo para poder actualizar"
        }); 
    }
})

.delete(cors(),function(req,res){
    console.log(req.body.Titulo);
    if(req.body.Titulo){
        let i=0;
        let verificador=-1;
        while(i<vector.size()){
            if(vector.vector[i].Titulo==req.body.Titulo)
            verificador=i;
            i++; 
        }
        if(verificador==-1){
            res.status(500).send({tipo: "Error",
            mensaje: "El libro no exite"}); 
        }else{
            vector.vector.splice(verificador,1);
            res.status(200).send({
                tipo:"Exitoso",
                mensaje: "El libro ha sido ELIMINADO"
            });
        }
    }else{
        res.status(500).send({
            tipo: "Error",
            mensaje: "Necesitas el Titulo para poder eliminar un libro"
        })
    }
})
app.route("/libros/:Titulo?")
.get(cors(),function(req,res){
    if(req.params.Titulo){
        let verificador=-1;
        let i=0;
        let titulo= req.params.Titulo; 
        while(i<vector.vector.length && verificador==-1){
            if(vector.vector[i].Titulo==titulo)
            verificador=i;
            i++; 
        }
        if(verificador==-1)
        res.status(500).send({tipo: "Error", Mensaje:"No existe"});
        else
        res.status(200).send({tipo:"Existoso", Mensaje: "Encontrado en la posicion: "+verificador, libro: vector.vector[verificador]}); 
    }
    else{
        if(vector.size()==0)
        res.status(500).send({tipo:"Error",Mensaje:"La lista esta vacia"});
    }
})
