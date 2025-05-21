// Carrusel automático
document.addEventListener("DOMContentLoaded", function() {
  // Código existente para preguntas y respuestas
  loadQuestions();

  // Nuevo código para el carrusel automático
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const slides = document.querySelector('.slides');
    const radioButtons = document.querySelectorAll('input[name="slides"]');
    let currentIndex = 0;
    let intervalId;

    function startCarousel() {
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % radioButtons.length;
        radioButtons[currentIndex].checked = true;
      }, 3000); // Cambia cada 3 segundos
    }

    function stopCarousel() {
      clearInterval(intervalId);
    }

    // Iniciar el carrusel automático
    startCarousel();

    // Pausar cuando el usuario interactúa
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);

    // También pausar cuando se selecciona manualmente
    radioButtons.forEach(radio => {
      radio.addEventListener('change', function() {
        currentIndex = Array.from(radioButtons).indexOf(this);
        stopCarousel();
        setTimeout(startCarousel, 10000); // Reanudar después de 10 segundos
      });
    });
  }

  // Código existente para Landbot
  window.addEventListener('mouseover', initLandbot, { once: true });
  window.addEventListener('touchstart', initLandbot, { once: true });
});

// Funciones existentes para preguntas y respuestas
function addQuestion() {
  let questionText = document.getElementById('questionInput').value;
  if (questionText.trim() === '') return;

  let questionObj = { text: questionText, answers: [] };
  let questions = JSON.parse(localStorage.getItem('questions')) || [];
  questions.push(questionObj);
  localStorage.setItem('questions', JSON.stringify(questions));

  displayQuestions();
  document.getElementById('questionInput').value = '';
}

function addAnswer(button, index) {
  let answerText = button.previousElementSibling.value;
  if (answerText.trim() === '') return;

  let questions = JSON.parse(localStorage.getItem('questions'));
  questions[index].answers.push(answerText);
  localStorage.setItem('questions', JSON.stringify(questions));

  displayQuestions();
}

function deleteQuestion(index) {
  let questions = JSON.parse(localStorage.getItem('questions'));
  questions.splice(index, 1);
  localStorage.setItem('questions', JSON.stringify(questions));

  displayQuestions();
}

function displayQuestions() {
  let questionsDiv = document.getElementById('questions');
  questionsDiv.innerHTML = '';

  let questions = JSON.parse(localStorage.getItem('questions')) || [];

  questions.forEach((question, index) => {
    let questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
      <strong>${question.text}</strong> 
      <button class="delete-btn" onclick="deleteQuestion(${index})">Eliminar</button><br>
      <input type="text" placeholder="Escribe tu respuesta" class="answerInput">
      <button onclick="addAnswer(this, ${index})">Responder</button>
      <div class="answers">${question.answers.map(ans => `<div class="answer">${ans}</div>`).join('')}</div>
    `;
    questionsDiv.appendChild(questionDiv);
  });
}

function loadQuestions() {
  displayQuestions();
}

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