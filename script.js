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
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = i;
      checkbox.className = 'option-checkbox';
      optionElement.appendChild(checkbox);

      const label = document.createElement('label');
      label.textContent = option;
      optionElement.appendChild(label);

      options.appendChild(optionElement);
    });
    quizElement.appendChild(options);

    // 確認ボタン
    const checkButton = document.createElement('button');
    checkButton.textContent = '回答を確認';
    checkButton.onclick = () => checkAnswer(quizElement, quiz.answer, quiz.explanation);
    quizElement.appendChild(checkButton);

    // 解説
    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.textContent = '';
    quizElement.appendChild(explanation);

    container.appendChild(quizElement);
  });
}

// 回答を確認し解説を表示する
function checkAnswer(quizElement, correctAnswers, explanation) {
  const checkboxes = quizElement.querySelectorAll('.option-checkbox');
  const selectedAnswers = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => parseInt(checkbox.value));

  const explanationElement = quizElement.querySelector('.explanation');

  // 選択数を確認
  if (selectedAnswers.length !== correctAnswers.length) {
    alert(`選択肢の数が正しくありません。指示に従って${correctAnswers.length}つ選んでください。`);
    explanationElement.textContent = '解説: 設問をよく読み、指示された数の選択肢を選んでください。';
    explanationElement.classList.add('show');
    return;
  }

  // 正答の確認（配列の内容と順序にかかわらず比較）
  const isCorrect =
    selectedAnswers.sort().toString() === correctAnswers.sort().toString();

  if (isCorrect) {
    alert('正解です！');
  } else {
    alert('不正解です。');
  }

  // 解説を表示
  explanationElement.textContent = `解説: ${explanation}`;
  explanationElement.classList.add('show');
}
