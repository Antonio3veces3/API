class estructura{
    constructor(){
        this.vector= new Array(); 
    }
    agregar(libro){
        this.vector.push(libro);  
    }
    mostrar(){
        return (this.vector); 
    }
    size(){
        return(this.vector.length); 
    }
}
module.exports=estructura; 