function sumar(){
	var n1= document.getElementById("num1").value;
	var n2= document.getElementById("num2").value;
	var tot= parseInt(n1)+parseInt(n2);
	document.getElementById("respuesta").innerHTML=tot;
}

function restar(){
	var n1= document.getElementById("num1").value;
	var n2= document.getElementById("num2").value;
	var tot= parseInt(n1)-parseInt(n2);
	document.getElementById("respuesta").innerHTML=tot;
}

function multiplicar(){
	var n1= document.getElementById("num1").value;
	var n2= document.getElementById("num2").value;
	var tot= parseInt(n1)*parseInt(n2);
	document.getElementById("respuesta").innerHTML=tot;
}

function dividir(){
	var n1= document.getElementById("num1").value;
	var n2= document.getElementById("num2").value;
	var tot= parseInt(n1)/parseInt(n2);
	document.getElementById("respuesta").innerHTML=tot;
}