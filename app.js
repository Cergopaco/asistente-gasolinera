// Verificar si el navegador soporta Web Speech API
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES'; // Idioma español
    recognition.continuous = false;
    recognition.interimResults = false;

    const startBtn = document.getElementById('start-recognition');
    const resultDiv = document.getElementById('result');

    // Acción al comenzar el reconocimiento
    startBtn.addEventListener('click', () => {
        recognition.start();
        resultDiv.textContent = 'Escuchando...';
    });

    // Resultado cuando el reconocimiento es exitoso
    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript;
        resultDiv.textContent = `Dijiste: ${speechResult}`;
        
        // Convertir el texto a voz
        speak(speechResult);
    };

    recognition.onerror = function(event) {
        resultDiv.textContent = `Error: ${event.error}`;
    };

    recognition.onend = function() {
        resultDiv.textContent += ' (Reconocimiento finalizado)';
    };
} else {
    alert('Tu navegador no soporta el reconocimiento de voz.');
}

// Función para convertir texto a voz
function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Español
    synth.speak(utterance);
}
