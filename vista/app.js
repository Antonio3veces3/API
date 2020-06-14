const btnadd= document.getElementById("btnagregar");
btnadd.addEventListener("click",(e)=>{
    let id= document.getElementById("id").value;
    let titulo= document.getElementById("titulo").value;
    let autor= document.getElementById("autor").value;
    let genero= document.getElementById("genero").value;
    let year= document.getElementById("year").value;
    let edicion= document.getElementById("edicion").value;
    var xhr= new XMLHttpRequest();
    xhr.open("POST","http://localhost:3002/libros",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    xhr.onreadystatechange=function(){
        let divdetalles= document.getElementById("resultados");
        if(this.readyState===XMLHttpRequest.DONE && this.status===200)
        {
            divdetalles.innerHTML=`
            <p>${this.response}</p>`;
        }
        else{
            divdetalles.innerHTML=`<p>${this.response}</p>`;
        }
    }
    xhr.send("Id="+id+"&Titulo="+titulo+"&Autor="+autor+"&Genero="+genero+"&Year="+year+"&Edicion="+edicion); 
});
const btnmostrar= document.getElementById("btnshow").addEventListener('click',()=>{
    var request= new XMLHttpRequest();
    request.open("GET","http://localhost:3002/libros",true);
    request.onload=function(){
        let detalles= document.getElementById("resultados"); 
        let dato= JSON.parse(this.response);
        if(request.status>=200 && request.status<400){
            detalles.innerHTML="<div><p>"+this.response+"</p></div>";
        }else{
            console.log("Error");
            detalles.innerHTML=`<p>Error en la llamada a la API </p>
            <p>${this.response}</p>`;
        }
    }
    request.send(); 
}); 

const btnactual= document.getElementById("btnactualizar").addEventListener('click',()=>{
    let id= document.getElementById("id").value;
    let titulo= document.getElementById("titulo").value;
    let autor= document.getElementById("autor").value;
    let genero= document.getElementById("genero").value;
    let year= document.getElementById("year").value;
    let edicion= document.getElementById("edicion").value;
    var xhr= new XMLHttpRequest();
    xhr.open("PUT","http://localhost:3002/libros",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    xhr.onreadystatechange=function(){
        let divdetalles= document.getElementById("resultados");
        if(this.readyState===XMLHttpRequest.DONE && this.status===200)
        {
            divdetalles.innerHTML=`
            <p>${this.response}</p>`;
        }
        else{
            divdetalles.innerHTML=`<p>${this.response}</p>`;
        }
    }
    xhr.send("Id="+id+"&Titulo="+titulo+"&Autor="+autor+"&Genero="+genero+"&Year="+year+"&Edicion="+edicion);  
});

const btndelete= document.getElementById("btndelete").addEventListener('click',()=>{
    let titulo= document.getElementById("titulo").value;
    var xhr= new XMLHttpRequest();
    xhr.open("DELETE","http://localhost:3002/libros",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    xhr.onreadystatechange=function(){
        let divdetalles= document.getElementById("resultados");
        if(this.readyState===XMLHttpRequest.DONE && this.status===200)
        {
            divdetalles.innerHTML=`
            <p>${this.response}</p>`;
        }
        else{
            divdetalles.innerHTML=`<p>${this.response}</p>`;
        }
    }
    xhr.send("Titulo="+titulo);  
});