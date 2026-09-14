const questions = [
  {
    emoji: '📖',
    question: 'Qual palavra está escrita corretamente?',
    answers: [
      { text: 'Caderno', correct: true },
      { text: 'Kaderno', correct: false },
      { text: 'Cadeno', correct: false },
      { text: 'Cadernu', correct: false }
    ],
    explanation: 'A forma correta é “caderno”, com “d” e “e” na palavra.'
  },
  {
    emoji: '✏️',
    question: 'Qual é o sinônimo de “feliz”?',
    answers: [
      { text: 'Contente', correct: true },
      { text: 'Triste', correct: false },
      { text: 'Rápido', correct: false },
      { text: 'Frio', correct: false }
    ],
    explanation: '“Contente” tem o mesmo significado de “feliz”.'
  },
  {
    emoji: '🧩',
    question: 'Qual palavra começa com a letra “A”?',
    answers: [
      { text: 'Amigo', correct: true },
      { text: 'Livro', correct: false },
      { text: 'Mesa', correct: false },
      { text: 'Tijolo', correct: false }
    ],
    explanation: 'A palavra “amigo” começa com a letra A.'
  },
  {
    emoji: '🗣️',
    question: 'Qual frase está correta?',
    answers: [
      { text: 'Eu gosto de ler.', correct: true },
      { text: 'Eu gosto ler de.', correct: false },
      { text: 'Eu ler gosto de.', correct: false },
      { text: 'Gosto eu ler de.', correct: false }
    ],
    explanation: 'A ordem correta da frase é “Eu gosto de ler.”'
  },
  {
    emoji: '🌟',
    question: 'Qual palavra é um substantivo?',
    answers: [
      { text: 'Casa', correct: true },
      { text: 'Correu', correct: false },
      { text: 'Bonito', correct: false },
      { text: 'Rápido', correct: false }
    ],
    explanation: '“Casa” é um nome de coisa, então é um substantivo.'
  }
];

const scoreEl = document.getElementById('score');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const answersEl = document.getElementById('answers');
const feedbackEl = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const emojiBox = document.getElementById('emoji-box');

let currentIndex = 0;
let score = 0;

function renderQuestion() {
  const current = questions[currentIndex];
  scoreEl.textContent = score;
  questionNumberEl.textContent = currentIndex + 1;
  questionTextEl.textContent = current.question;
  emojiBox.textContent = current.emoji;
  feedbackEl.classList.add('hidden');
  feedbackEl.classList.remove('correct', 'wrong');
  nextButton.classList.add('hidden');
  answersEl.innerHTML = '';

  current.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-button';
    button.textContent = answer.text;
    button.addEventListener('click', () => handleAnswer(button, answer.correct, current.explanation));
    answersEl.appendChild(button);
  });
}

function handleAnswer(button, isCorrect, explanation) {
  const allButtons = [...answersEl.querySelectorAll('.answer-button')];

  allButtons.forEach((item) => {
    item.disabled = true;
  });

  allButtons.forEach((item) => {
    const answerText = item.textContent;
    const matching = questions[currentIndex].answers.find((entry) => entry.text === answerText);
    if (matching && matching.correct) {
      item.classList.add('correct');
    }
  });

  if (isCorrect) {
    score += 10;
    feedbackEl.textContent = `✅ Correto! ${explanation}`;
    feedbackEl.classList.add('correct');
    button.classList.add('correct');
  } else {
    feedbackEl.textContent = `❌ Não foi dessa vez. ${explanation}`;
    feedbackEl.classList.add('wrong');
    button.classList.add('wrong');
  }

  feedbackEl.classList.remove('hidden');
  scoreEl.textContent = score;
  nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
  currentIndex += 1;

  if (currentIndex < questions.length) {
    renderQuestion();
    return;
  }

  questionTextEl.textContent = '🎉 Você terminou a revisão de Português!';
  answersEl.innerHTML = '';
  emojiBox.textContent = '🏆';
  feedbackEl.textContent = `Sua pontuação final foi: ${score} pontos.`;
  feedbackEl.classList.remove('hidden');
  feedbackEl.classList.add('correct');
  nextButton.classList.add('hidden');
  questionNumberEl.textContent = questions.length;
});

renderQuestion();
