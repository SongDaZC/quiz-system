// JSONファイルからクイズデータを読み込む
fetch('quiz.json')
  .then(response => response.json())
  .then(data => initializeQuiz(data))
  .catch(error => console.error('クイズデータの読み込みに失敗しました:', error));

function initializeQuiz(quizData) {
  const container = document.getElementById('quiz-container');
  quizData.forEach((quiz, index) => {
    const quizElement = document.createElement('div');
    quizElement.className = 'quiz';

    // 問題文
    const question = document.createElement('div');
    question.className = 'question';
    question.textContent = `Q${index + 1}: ${quiz.question}`;
    quizElement.appendChild(question);

    // 選択肢
    const options = document.createElement('ul');
    options.className = 'options';
    quiz.options.forEach((option, i) => {
      const optionElement = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => checkAnswer(quizElement, i, quiz.answer, quiz.explanation);
      optionElement.appendChild(button);
      options.appendChild(optionElement);
    });
    quizElement.appendChild(options);

    // 解説
    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.textContent = quiz.explanation;
    quizElement.appendChild(explanation);

    container.appendChild(quizElement);
  });
}

// 回答を確認し解説を表示する
function checkAnswer(quizElement, selected, correct, explanation) {
  const explanationElement = quizElement.querySelector('.explanation');
  if (selected === correct) {
    alert('正解です！');
  } else {
    alert('不正解です。');
  }
  explanationElement.classList.add('show');
}
