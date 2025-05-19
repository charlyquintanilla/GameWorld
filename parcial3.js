function total(){
	var tipo = document.getElementById("type").value;
	var horas = document.getElementById("horas").value;
	var monto = tipo*horas; 
	document.getElementById("resultado").innerHTML = "\<br> Tu total es de: $"+monto;
}