// JavaScript Document
function validar() {
    alert("Ingreso validado");
}

document.getElementById("user").addEventListener("input", function() {
    var valor = this.value;  

    if (!esValorValido(valor)) {
        this.classList.add("error");
    } else {
        this.classList.remove("error");
    }
});

document.getElementById("pasword").addEventListener("input", function() {
    var valor = this.value; 

    if (!esNumeroValido(valor)) {
        this.classList.add("error");
    } else {
		
        this.classList.remove("error");
    }
});

document.getElementById("form1").addEventListener("submit", function(){
	var usuario= document.getElementById("user").value;
	var contra=document.getElementById("pasword").value;
	var letras = /^[A-Za-z]+$/;
	var numeros= /^\d+$/;
	    if (!letras.test(usuario)) {
			  event.preventDefault();
			alert("Ingrese solamente letras en el usuario");
			
			return;
        
    } else if(!numeros.test(contra)) {
		event.preventDefault();
		alert("Ingrese solamente numeros en la contraseña");
		
        
		return;
    }
	
	document.write("Hola mundo");
});

function esValorValido(valor) {
    return /^[A-Za-z]+$/.test(valor);  // Verifica si el valor contiene solo números
}
function esNumeroValido(valor){
	return /^\d+$/.test(valor); 
}
