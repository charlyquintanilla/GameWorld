// Precios de los tratamientos
const precios = {
  "Limpieza dental": 800,
  "Blanqueamiento": 2500,
  "Ortodoncia": 15000,
  "Extracción": 1200,
  "Implante": 8000,
  "Resina": 1500
};

// Calcular total cuando se seleccionan tratamientos
document.querySelectorAll('input[name="tratamiento"]').forEach(checkbox => {
  checkbox.addEventListener('change', calcularTotal);
});

function calcularTotal() {
  let total = 0;
  document.querySelectorAll('input[name="tratamiento"]:checked').forEach(checkbox => {
    total += precios[checkbox.value];
  });
  document.getElementById('monto-total').textContent = `$${total.toLocaleString()}`;
}

// Generar PDF
window.generarPDF = async function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(20);
  doc.setTextColor(0, 74, 173);
  doc.text("ARDENT - Odontología Integral", 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Presupuesto y Registro de Cita", 105, 30, { align: 'center' });
  
  // Datos del paciente
  doc.setFontSize(14);
  doc.text("Datos del Paciente:", 15, 45);
  
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  
  doc.text(`Nombre: ${nombre}`, 20, 55);
  doc.text(`Teléfono: ${telefono}`, 20, 65);
  doc.text(`Correo electrónico: ${email}`, 20, 75);
  
  // Detalles de la cita
  doc.text("Detalles de la Cita:", 15, 90);
  
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-MX');
  
  doc.text(`Fecha: ${fechaFormateada}`, 20, 100);
  doc.text(`Hora: ${hora}`, 20, 110);
  
  // Tratamientos seleccionados
  doc.text("Tratamientos Seleccionados:", 15, 125);
  
  let y = 135;
  let total = 0;
  const tratamientos = document.querySelectorAll('input[name="tratamiento"]:checked');
  
  if (tratamientos.length === 0) {
    doc.text("No se seleccionaron tratamientos", 20, y);
    y += 10;
  } else {
    tratamientos.forEach((tratamiento, index) => {
      const nombreTratamiento = tratamiento.value;
      const precio = precios[nombreTratamiento];
      total += precio;
      
      doc.text(`${index + 1}. ${nombreTratamiento} - $${precio.toLocaleString()}`, 20, y);
      y += 10;
    });
  }
  
  // Total
  doc.setFontSize(16);
  doc.setTextColor(0, 100, 0);
  doc.text(`Total: $${total.toLocaleString()}`, 20, y + 15);
  
  // Observaciones
  const observaciones = document.getElementById('observaciones').value;
  if (observaciones) {
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Observaciones:", 15, y + 30);
    doc.text(observaciones, 20, y + 40, { maxWidth: 170 });
  }
  
  // Pie de página
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("ARDENT - Odontología Integral | Tel: 444 216 3695", 105, 285, { align: 'center' });
  
  // Generar gráfico
  generarGraficoTratamientos(tratamientos);
  
  // Mostrar PDF
  const pdfString = doc.output('datauristring');
  document.querySelector('iframe').setAttribute('src', pdfString);
};

// Generar gráfico de tratamientos seleccionados
function generarGraficoTratamientos(tratamientos) {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Tratamiento');
    data.addColumn('number', 'Precio');
    
    tratamientos.forEach(tratamiento => {
      const nombre = tratamiento.value;
      data.addRow([nombre, precios[nombre]]);
    });

    const options = {
      title: 'Distribución de Costos por Tratamiento',
      pieHole: 0.4,
      colors: ['#004AAD', '#3885BB', '#5ce1e6', '#2ecc71', '#27ae60'],
      chartArea: { width: '90%', height: '80%' }
    };

    const chart = new google.visualization.PieChart(document.getElementById('grafico-tratamientos'));
    chart.draw(data, options);
  }
}