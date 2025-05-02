function leer(){
	//Referencia por pseudoclase
	var nombre = document.forms["formulario"].elements[0].value;
	
	//Referencia por ID
	var clave = document.getElementById("pass").value;

	//Referencia por TagName
	var car = document.getElementsByTagName("select")[0].value;

	//Referencia por Name
	var i,g;
	var gen = document.getElementsByName("genero");
	
	for(i=0; i<gen.length; i++){
		if (gen[i].checked) {
			g = gen[i].value; 
		}
	}


	//Referencia por ID
	var p= document.getElementById("privacidad").checked;

	document.getElementById("datos").innerHTML = 
	"\<br>Tu nombre es: "+nombre+"\<br>Password: "+clave
	+"\<br>Tu carrera es: "+car+"\<br>Genero: "+g
	+"\<br>Acepto el acuerdo: "+p;

}