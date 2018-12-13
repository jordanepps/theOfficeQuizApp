let currentQuestion = 0,
	currentScore = { correct: 0, incorrect: 0 };

function startQuiz() {
	//Listen for button click to start quiz
	$('#js-start-section').on('click', '.js-start-button', e => {
		//Hide start section from view
		$('#js-start-section').hide();
		//increment current question;
		handleCurrentQuestionNumber();
		//load questions to question section
		$('#js-questions').html($(loadQuestion(currentQuestion)));
	});
}

function handleCurrentQuestionNumber() {
	currentQuestion++;
}

function loadQuestion(questionNumber) {
	//get access to question data
	const questionData = STORE[questionNumber - 1];
	let answers = ``;
	$('#js-current-question').html(questionNumber);
	//loop through each question option and save info to proper input tag
	questionData.answers.forEach(answer => {
		//concat strings to answers
		answers += `<input type="radio" name="user-answer" value="${answer}">
					<label for="${answer}">${answer}</label>`;
	});
	//return from with specific question/answer data
	return `<h2 class="js-question">${questionData.question}</h2>
	<form class="js-question-form">
		<fieldset>
		${answers}
		</fieldset>
		<button type="submit">Sumbit</button>
	</form>`;
}

function handleSumbitAnswer() {
	//Add event listener to submit button
	//Get the user answer value and compare to correct value
	//show user if answer is correct or not

	$('#js-questions').on('submit', '.js-question-form', e => {
		e.preventDefault();
		const userAnswer = $('input[name="user-answer"]:checked').val();
		console.log(userAnswer === STORE[currentQuestion - 1].correctAnswer);
	});
}

function handleCorrectAnswer() {}

function loadQuizApp() {
	startQuiz();
	handleSumbitAnswer();
}

$(loadQuizApp);
