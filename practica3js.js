function calificar(){
    
    var acc=0, wr = 0, calf = 0 ;
    var name = document.getElementById("nombre").value;
    var answer1 = document.getElementById("pregunta1").value;
        if(answer1 == 1) acc+=1;
        else wr++;
    var answer2 = document.getElementById("pregunta2").value;
        if(answer2 == 1) acc+=1;
        else wr++;
    var answer3 = document.getElementById("pregunta3").value;
        if(answer3 == 1) acc+=1;
        else wr++;
    var answer4 = document.getElementById("pregunta4").value;
        if(answer4 == 1) acc+=1;
        else wr++;
    var answer5 = document.getElementById("pregunta5").value;
        if(answer5 == 1) acc+=1;
        else wr++;

    calf += acc*2;

    document.getElementById("respuestas").innerHTML = "Su calificacion es: "+calf;

    
    var data = google.visualization.arrayToDataTable([
        ['Calification', 'Correct Answers'],
        ['Correcto',     acc],
        ['Incorrecto',   wr],
      ]);

      var options = {
        title: 'Porcentaje de preguntas acertadas',
        is3D: true,
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      chart.draw(data, options);

      var estado;
      if(calf > 7) estado = "Aprobado";
      else estado = "Reprobado";

      var pdf = new jsPDF('a4');
      pdf.setFontSize(40);
      pdf.setTextColor(255, 0, 0);
      pdf.text("Reporte de resultados", 45, 20);
      pdf.setFontSize(25);
      pdf.setTextColor(194, 87, 229);
      pdf.text("Alumno: "+name,10, 40)
      pdf.text("Resultado: "+estado, 10, 50);
      pdf.text("Calificacion obtenida: "+calf+"/10",10, 60);

      $( '#PDF' ).attr('src', pdf.output('datauristring'));
}





