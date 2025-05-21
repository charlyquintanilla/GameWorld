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
document.getElementById('generar-pdf').addEventListener('click', async function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Configuración inicial
  doc.setFont('helvetica');
  
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
    
    // Dividir el texto en líneas que quepan en el PDF
    const splitObservaciones = doc.splitTextToSize(observaciones, 170);
    doc.text(splitObservaciones, 20, y + 40);
  }
  
  // Pie de página
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("ARDENT - Odontología Integral | Tel: 444 216 3695", 105, 285, { align: 'center' });
  
  // Generar gráfico
  generarGraficoTratamientos(tratamientos);
  
  // Mostrar PDF en el iframe
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const pdfIframe = document.getElementById('pdf-iframe');
  
  pdfIframe.src = pdfUrl;
  
  // Mostrar el contenedor del PDF
  document.getElementById('pdf-container').style.display = 'block';
  
  // Opción para descargar directamente
  // doc.save('Presupuesto_ARDENT.pdf');
});

// Generar gráfico de tratamientos seleccionados
function generarGraficoTratamientos(tratamientos) {
  if (tratamientos.length === 0) {
    document.getElementById('grafico-tratamientos').style.display = 'none';
    return;
  }
  
  document.getElementById('grafico-tratamientos').style.display = 'block';
  
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
      chartArea: { 
        width: '90%', 
        height: '80%',
        left: '5%',
        top: '15%'
      },
      fontSize: 12,
      titleTextStyle: {
        fontSize: 16
      }
    };

    const chart = new google.visualization.PieChart(document.getElementById('grafico-tratamientos'));
    
    // Redibujar el gráfico cuando cambie el tamaño de la ventana
    window.addEventListener('resize', function() {
      chart.draw(data, options);
    });
    
    chart.draw(data, options);
  }
}

// Inicializar Landbot (chat)
window.addEventListener('mouseover', initLandbot, { once: true });
window.addEventListener('touchstart', initLandbot, { once: true });
var myLandbot;
function initLandbot() {
  if (!myLandbot) {
    var s = document.createElement('script');
    s.type = "module"
    s.async = true;
    s.addEventListener('load', function() {
      myLandbot = new Landbot.Popup({
        configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2925289-YFZJXUXL5KPSUVLN/index.json',
      });
    });
    s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs';
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  }
}